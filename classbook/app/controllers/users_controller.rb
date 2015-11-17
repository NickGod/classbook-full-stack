class UsersController < ApplicationController
#To ADD: VALIDATION

  def get_friends
    user  = User.find_by_id(params[:id])
    fans = user.followers
    stars = user.following
    render json: fans & stars
  end

  def request_friend
    current_user = User.find(params[:my_id])
    wantFriend = User.find(params[:other_id])
    if wantFriend == current_user || current_user.following.include?(wantFriend)
      render json: {"error":true,"errormsg":"either not valid, or request already sent"} , status: :bad_request
      return
    end
    current_user.following << wantFriend
  end

  def accept_friend_request
    current_user = User.find(params[:my_id])
    futureFriend = User.find(params[:other_id])
    if futureFriend.following.include?(current_user)
      render json: {"error":true,"errormsg":"You made a mistake, he/she is not requesting a friendship"} , status: :bad_request
      return
    end
    current_user.following << futureFriend
  end

  def get_pending_friends
    current_user = User.find(params[:id])
    requests = current_user.followers - current_user.following
    render json: requests
  end
end