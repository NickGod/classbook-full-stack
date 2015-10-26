class LecturesController < ApplicationController
  before_action :set_lecture, only: [:show, :update, :destroy]

  # GET /lectures
  # GET /lectures.json
  def index
    @lectures = Lecture.all

    render json: @lectures
  end

  # GET /lectures/1
  # GET /lectures/1.json
  def show
    render json: @lecture
  end

  # POST /lectures
  # POST /lectures.json
  def create
    @lecture = Lecture.new(lecture_params)

    if @lecture.save
      render json: @lecture, status: :created, location: @lecture
    else
      render json: @lecture.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /lectures/1
  # PATCH/PUT /lectures/1.json
  def update
    @lecture = Lecture.find(params[:id])

    if @lecture.update(lecture_params)
      head :no_content
    else
      render json: @lecture.errors, status: :unprocessable_entity
    end
  end

  # DELETE /lectures/1
  # DELETE /lectures/1.json
  def destroy
    @lecture.destroy

    head :no_content
  end

  private

    def set_lecture
      @lecture = Lecture.find(params[:id])
    end

    def lecture_params
      params.require(:lecture).permit(:name, :begTime, :endTime, :days, :location)
    end
end
