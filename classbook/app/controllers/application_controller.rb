class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  def searchClass
  	name = params['className']
  	department = params['department']
  	discussion = params['discussion']

  	if name.nil? && department.nil? || name.nil? && !discussion.nil?
  		render json: {error: true, errormsg: "invalid parameters"} , status: :bad_request
  		return
  	end

  	if name.nil?
  		lectures = Lecture.where(department: department)
  	else
  		lectures = Lecture.where(name: name)
  	end

  	if discussion.nil?
	  	discussions = []
	  	lectures.each do |lecture|
	  		discussions += Discussion.where(lectureId: lecture.id)
	  	end
	else
		discussions = Discussion.where(className: discussion, lectureId: lectures.first.id)
	end

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
			:discussions => disList.select{|dis| dis[:lectureId] == l.id},
			:term => 'FALL'
		}
	end

	render json: lectureList.to_json

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
