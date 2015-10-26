class DiscussionsController < ApplicationController
  before_action :set_discussion, only: [:show, :update, :destroy]

  # GET /discussions
  # GET /discussions.json
  def index
    @discussions = Discussion.all

    render json: @discussions
  end

  # GET /discussions/1
  # GET /discussions/1.json
  def show
    render json: @discussion
  end

  # POST /discussions
  # POST /discussions.json
  def create
    @discussion = Discussion.new(discussion_params)

    if @discussion.save
      render json: @discussion, status: :created, location: @discussion
    else
      render json: @discussion.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /discussions/1
  # PATCH/PUT /discussions/1.json
  def update
    @discussion = Discussion.find(params[:id])

    if @discussion.update(discussion_params)
      head :no_content
    else
      render json: @discussion.errors, status: :unprocessable_entity
    end
  end

  # DELETE /discussions/1
  # DELETE /discussions/1.json
  def destroy
    @discussion.destroy

    head :no_content
  end

  private

    def set_discussion
      @discussion = Discussion.find(params[:id])
    end

    def discussion_params
      params.require(:discussion).permit(:lectureId, :begTime, :endTime, :days, :location)
    end
end
