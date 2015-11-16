class MessageController < ApplicationController

	def get_user_message
		#user_id = current_user.id

		#to be changed
		user_id  = params[:user_id]
		render json: Message.where(user_id: user_id)
	end

	def read
		msg_id = params[:id]
		#mark read
		render json: error: 'false'
	end
end
