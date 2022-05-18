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
    render json: rooms_array
  end

  # 消す
  def create
    is_room_exist = false
    my_entries = Entry.where(user_id: current_api_v1_user.id)
    other_entries = Entry.where(user_id: params[:id])
    my_entries.each do |me|
      other_entries.each do |oe|
        is_room_exist = true if me.room_id == oe.room_id
      end
    end
    if is_room_exist
      my_entries = Entry.where(user_id: current_api_v1_user.id)
      other_entries = Entry.where(user_id: params[:id])
      my_entries.each do |me|
        other_entries.each do |oe|
          if me.room_id == oe.room_id
            room = Room.find_by(id: me.room_id)
            render json: room
          end
        end
      end
    else
      room = Room.create
      Entry.create(room_id: room.id, user_id: current_api_v1_user.id)
      Entry.create(room_id: room.id, user_id: params[:id])
      room = Room.find_by(id: room.id)
      render json: room
    end
  end

  def show
    room = Room.find_by(id: params[:id])
    other_user = room.users.where.not(id: current_api_v1_user.id)[0]
    messages = room.messages.order(created_at: :asc)
    render json: { other_user:, messages: }
  end
end
