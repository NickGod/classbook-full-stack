class EnrollmentsController < ApplicationController
	def get_all_discussion
		@user = User.find(params[:id])
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

	#http://stackoverflow.com/questions/5863477/how-do-i-build-a-json-object
	def enroll
		user = User.find(params[:userid])
		discussion = Discussion.find(params[:discussionid])
		if(user.discussions.exists? discussion) 
			render plain: ActiveSupport::JSON.encode({error_flag: 1, error_msg: 
															"Already enrolled"},msg:"")
		else
			user.discussions<<discussion
			render plain: ActiveSupport::JSON.encode({error_flag: 0, error_msg: 
															"",msg: "success"})
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
