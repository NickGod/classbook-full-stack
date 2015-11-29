class SwapRequestsController < ApplicationController
	#before_action :authenticate_user! ,unless: "Rails.env.test?"

	def create
		current_user = User.find(params[:user_id])
		@user = current_user
		@sw_reqst = SwapRequest.new(swap_requests_params)
		
		if @sw_reqst.save
			match(@sw_reqst)
      		render json: @sw_reqst, status: :created
    	else
      		render json: @sw_reqst.errors, status: :unprocessable_entity
    	end

	end

	def check

	end

	private
	def match(selfRequest)
		selfRequest
		matchedRequests = SwapRequest.where(has_dis: selfRequest.want_dis, want_dis: selfRequest.has_dis,current_match_user_id: nil)
		if(matchedRequests != [])
			matchedRequest = matchedRequests[0]
			if(selfRequest.update(current_match_user_id: matchedRequest.user_id)&&
				matchedRequest.update(current_match_user_id: selfRequest.user_id))
				if(!add_message(selfRequest))
					return false
				end
				# gan hen duo shi qing
			else
				return false
			end

		end
		return true
	end

	def swap_requests_params
      params.permit(:user_id, :has_dis, :want_dis)
    end

    def add_message(swap_request)
    	user1_msg = Message.new
    	user1_msg.user_id = swap_request.user_id
    	user1_msg.category = "swap_request"
    	user1_msg.context = {has_dis: swap_request.has_dis, want_dis: swap_request.want_dis,
    						 match_user_id: swap_request.current_match_user_id}.to_json

    	user2_msg = Message.new	 
    	user2_msg.user_id = swap_request.current_match_user_id
    	user2_msg.category = "swap_request"
    	user2_msg.context = {has_dis: swap_request.want_dis, want_dis: swap_request.has_dis,
    						 match_user_id: swap_request.user_id}.to_json
    	if(user1_msg.save && user2_msg.save)
    		return true;
    	else
    		return false;
    	end

    end

end
