class EnrollmentsController < ApplicationController
	#before_action :authenticate_user! ,unless: "Rails.env.test?"

	def get_all_discussion
		@user = User.find_by_id(params[:id])
		if @user.nil?
			render json: {error: true, errormsg: "invalid user"} , status: :bad_request
			return
		end
		@discussions = @user.discussions
		@lectures = Lecture.select{ |l| l.id.in? @discussions.map{|d| d.lectureId} }

		@disList = @discussions.map do |d|
  		{ 
  			:className => Lecture.find(d.lectureId).name + "DIS",
  			:startTime => formatTime(d.begTime), 
  			:endTime => formatTime(d.endTime), 
  			:days => processDays(d.days)
  		}
		end

		@lectureList = @lectures.map do |l|
  		{ 
  			:className => l.name,
  			:startTime => formatTime(l.begTime), 
  			:endTime => formatTime(l.endTime), 
  			:days => processDays(l.days)  		
  		}
		end

		allList = @disList + @lectureList

		render json: allList.to_json

	end

	def get_discussions
		if(params[:ids].nil?)
			@discussions = Discussion.all
		else
			discussionJsonArray = params[:ids]
			discussionArray = JSON.parse(discussionJsonArray)
			@discussions = Discussion.find(discussionArray)
		end
		@lectures = Lecture.select{ |l| l.id.in? @discussions.map{|d| d.lectureId} }

		@disList = @discussions.map do |d|
  		{ 
  			:className => Lecture.find(d.lectureId).name + "DIS",
  			:startTime => formatTime(d.begTime), 
  			:endTime => formatTime(d.endTime), 
  			:days => processDays(d.days)
  		}
		end

		@lectureList = @lectures.map do |l|
  		{ 
  			:className => l.name,
  			:startTime => formatTime(l.begTime), 
  			:endTime => formatTime(l.endTime), 
  			:days => processDays(l.days)  		
  		}
		end

		allList = @disList + @lectureList

		render json: allList.to_json

	end



	def get_enrolled_for_drop_use
		@user = User.find_by_id(params[:id])
		if @user.nil?
			render json: {error: true, errormsg: "invalid user"} , status: :bad_request
			return
		end

		discussions = @user.discussions 
		lectures = Lecture.select{ |l| l.id.in? discussions.map{|d| d.lectureId} }

		disList = discussions.map do |d|
  		{
  			:lectureId => d.lectureId, 
  			:discussionId => d.id,
  			:discussionName => d.className,
  			:startTime => formatTime(d.begTime), 
  			:endTime => formatTime(d.endTime), 
  			:days => processDays(d.days)
  		}
		end


	lectureList = lectures.map do |l|
		{ 
			:lectureId => l.id,
			:className => l.name,
			:department => l.department,
			:startTime => formatTime(l.begTime), 
			:endTime => formatTime(l.endTime), 
			:days => processDays(l.days),
			:discussion => disList.find{|dis| dis[:lectureId] == l.id},
			:term => 'FALL'
		}
	end

	render json: lectureList.to_json

	end

	#http://stackoverflow.com/questions/5863477/how-do-i-build-a-json-object
	def enroll
		user = User.find_by_id(params[:userId])
		discussion = Discussion.find_by_id(params[:discussionId])
		if(user.discussions.exists? discussion) 
			render plain: ActiveSupport::JSON.encode({error_flag: 1, error_msg: 
															"Already enrolled"},msg:"")
		else
			user.discussions<<discussion
			render plain: ActiveSupport::JSON.encode({error_flag: 0, error_msg: 
															"",msg: "success"})
		end
	end

	def drop
		user = User.find_by_id(params[:userId])
		discussion = Discussion.find_by_id(params[:discussionId])
		render json: {error: true, 
			errormsg: "invalid user or discussionId"} , status: :bad_request if user.nil? || discussion.nil?
		if(user.discussions.exists? discussion) 
			user.discussions.delete(discussion)
			render json: {error: false} , status: :ok
		else
			render json: {error: true, 
			errormsg: "discussion not enrolled"} , status: :bad_request
		end
	end

	def formatTime (rawTime)
		index = rawTime.index(':')
		lastChar = rawTime[-1]
		hours = rawTime[0,index].to_i
		mins = rawTime[-3,2]
		if(lastChar == 'A' && hours == 12)
			hours = 0
		end

		if (lastChar == 'P' && hours != 12)
			hours += 12
		end

		return hours.to_s + ':' + mins + ":00"
	end

	def processDays(days)
		array = days.split("")
		array.map!(&:to_i)
		return array
	end

end