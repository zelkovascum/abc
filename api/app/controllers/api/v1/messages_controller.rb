class Api::V1::MessagesController < ApplicationController
  before_action :authenticate_api_v1_user!

  def create
    # message = Message.new(user_id: current_api_v1_user.id, room_id: params[:id], content: params[:content], image: params[:image])
    message = Message.new(message_params)
    if message.save
      render json: message, status: :created
    else
      render json: message.errors, status: :bad_request
    end
  end

  private

    def message_params
      params.permit(:user_id, :room_id, :content, :image).merge(user_id: current_api_v1_user.id)
    end
end
