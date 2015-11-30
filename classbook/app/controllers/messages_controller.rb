class MessagesController < ApplicationController
	  #before_action :authenticate_user! ,unless: "Rails.env.test?"


	def get_user_message
		#user_id = current_user.id

		#to be changed
		user_id  = params[:user_id]
		render json: Message.where(user_id: user_id)
	end

	def read
		msg_id = params[:id]
		msg = Message.find(msg_id)
		msg.read = true
		if(msg.save)
			errormsg = {error: false, read_status: msg.read}
		else
			errormsg = {error: true, read_status: msg.read}
		end	
		render json: errormsg
	end
end
