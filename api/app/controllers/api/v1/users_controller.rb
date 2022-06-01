class Api::V1::UsersController < ApplicationController
  # before_action :authenticate_api_v1_user!

  def index
    users = User.all.order(created_at: :desc)
    render json: users, status: :ok
  end

  def show
    user = User.find_by(id: params[:id])
    user_info = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      address: user.address
    }
    # 相手とのルーム情報
    is_room_exist = false
    my_entries = Entry.where(user_id: current_api_v1_user.id)
    other_entries = Entry.where(user_id: user.id)
    my_entries.each do |my_entrie|
      other_entries.each do |other_entrie|
        is_room_exist = true if my_entrie.room_id == other_entrie.room_id
      end
    end
    if is_room_exist
      my_entries.each do |my_entrie|
        other_entries.each do |other_entrie|
          if my_entrie.room_id == other_entrie.room_id
            room = Room.find_by(id: my_entrie.room_id)
            render json: { user_info:, room_id: room.id }, status: :ok
          end
        end
      end
    else
      render json: { user_info:, room_id: 0 }, status: :ok
    end
  end

  def update
    user = User.find_by(id: params[:id])
    if user.id == current_api_v1_user.id
      if user.update(user_params)
        render json: user, status: :ok
      else
        render json: user.errors, status: :bad_request
      end
    else
      render json: {}, status: :bad_request
    end
  end

  private

    def user_params
      params.permit(:name, :image, :address)
    end
end
