class UsersController < ApplicationController
  #before_action :authenticate_user! ,unless: "Rails.env.test?"

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
      render json: {error:true, errormsg:"either not valid, or request already sent"} , status: :bad_request
      return
    end
    current_user.following << wantFriend
  end

  def accept_friend_request
    current_user = User.find(params[:my_id])
    futureFriend = User.find(params[:other_id])
    if !futureFriend.following.include?(current_user)
      render json: {error:true, errormsg: "You made a mistake, he/she is not requesting a friendship"} , status: :bad_request
      return
    end
    current_user.following << futureFriend
  end

  def get_pending_friends
    current_user = User.find(params[:id])
    requests = current_user.followers - current_user.following
    render json: requests
  end

  def get_user_info
      user = User.find_by_id(params[:id])
      if(user.nil?)
          render json: {error: true, errormsg: "invalid user id"}, status: 400
      else
          render json: {error: false, id: user.id, email: user.email, name: user.name,
                        year: user.year, major: user.major, sex: user.sex}
      end
  end

  def update_user_info
      user = User.find_by_id(params[:id])
      user.email  = params[:email]
      user.name   = params[:name]
      user.year   = params[:year]
      user.major  = params[:major]
      user.sex    = params[:sex]
      if user.save
          render json: {error: false}
      else
          render json: user.errors, status: :unprocessable_entity
      end
  end



  def search_user
    email = params['email']
    name = params['name']
    if email.nil? && name.nil?
      render json: {error: true, errormsg: "invalid email and name"}, status: :bad_request
      return
    end
    userList = []
    if email.nil?
      userList = User.where(name: name)
    elsif name.nil?
      userList = User.where(email: email)
    else
      userList = User.where(email: email, name: name)
    end
    render json: userList

  end


end