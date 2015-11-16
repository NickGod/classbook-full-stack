class SwapRequestsController < ApplicationController
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
		matchedRequests = SwapRequest.where(has_dis: selfRequest.want_dis, want_dis: selfRequest.has_dis)
		if(matchedRequests != [])
			matchedRequest = matchedRequests[0]
			if(selfRequest.update(current_match_user_id: matchedRequest.user_id)&&
				matchedRequest.update(current_match_user_id: selfRequest.user_id))
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

end
