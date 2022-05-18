class Api::V1::ReactionsController < ApplicationController
  # from_user_id リアクションをした人
  # to_user_id   リアクションをされた人
  def index
    reactions = Reaction.where(to_user_id: current_api_v1_user.id)
    reactions_array = reactions.map do |reaction|
      {
        from_user_id: reaction.from_user_id,
        to_user_id: reaction.to_user_id
      }
    end
    render json: reactions_array, status: 200
  end

  def create
    active_reaction = Reaction.find_or_initialize_by(reaction_params)
    passsive_reaction = Reaction.find_by(
      from_user_id: active_reaction.to_user_id,
      to_user_id: active_reaction.from_user_id
    )
    
    # is_matched = false # マッチングが成立したかどうかのフラグ
    # if passsive_reaction # いいねを押した際、相手からのいいねがすでに存在する場合はマッチング成立
    #   room = Room.create
    #   Entry.find_or_create_by(
    #     room_id: room.id,
    #     user_id: active_reaction.from_user_id
    #   )
    #   Entry.find_or_create_by(
    #     room_id: room.id,
    #     user_id: passsive_reaction.from_user_id
    #   )
    #   is_matched = true
    # end
    # if active_reaction.save
    #   render json: { status: 200, like: active_reaction, is_matched: }
    # else
    #   render json: { status: 500, message: '作成失敗' }
    # end

    # room
    is_room_exist = false
    my_entries = Entry.where(user_id: active_reaction.to_user_id)
    other_entries = Entry.where(user_id: active_reaction.from_user_id)
    my_entries.each do |me|
      other_entries.each do |oe|
        is_room_exist = true if me.room_id == oe.room_id
      end
    end
    if is_room_exist
      my_entries = Entry.where(user_id: active_reaction.to_user_id)
      other_entries = Entry.where(user_id: active_reaction.from_user_id)
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
      Entry.create(room_id: room.id, user_id: active_reaction.to_user_id)
      Entry.create(room_id: room.id, user_id: active_reaction.from_user_id)
      room = Room.find_by(id: room.id)
      render json: room
    end
  end

  private

    def reaction_params
      params.require(:reaction).permit(:from_user_id, :to_user_id)
      # params.permit(:from_user, :to_user)
    end
end
