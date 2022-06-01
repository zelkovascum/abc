class Api::V1::RoomsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    rooms = current_api_v1_user.rooms.order(created_at: :desc)
    rooms_array = rooms.map do |room|
      {
        id: room.id,
        current_user: room.users.where(id: current_api_v1_user.id)[0],
        other_user: room.users.where.not(id: current_api_v1_user.id)[0],
        last_message: room.messages[-1]
      }
    end
    render json: rooms_array, status: :ok
  end

  def show
    room = Room.find_by(id: params[:id])
    other_user = room.users.where.not(id: current_api_v1_user.id)[0]
    messages = room.messages.order(created_at: :asc)
    render json: { other_user:, messages: }, status: :ok
  end
end
