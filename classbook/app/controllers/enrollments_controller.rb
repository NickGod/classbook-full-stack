class EnrollmentsController < ApplicationController
	def get_all_discussion
		@user = User.find(params[:id])
		render json: @user.discussions 
	end

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

end
