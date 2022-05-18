class Api::V1::ReactionsController < ApplicationController
  # from_user_id リアクションをした人
  # to_user_id   リアクションをされた人
  def index
    reactions = Reaction.where(to_user_id: current_api_v1_user.id)
    reaction_users = reactions.map {|reaction| reaction.from_user}
    render json: reaction_users, status: 200
  end

  def create
    is_room_exist = false
    sent_reaction = Reaction.find_or_create_by(reaction_params)
    received_reaction = Reaction.find_by(
      from_user_id: sent_reaction.to_user_id,
      to_user_id: sent_reaction.from_user_id
    )
    if received_reaction
      my_entries = Entry.where(user_id: sent_reaction.to_user_id)
      other_entries = Entry.where(user_id: sent_reaction.from_user_id)
      my_entries.each do |me|
        other_entries.each do |oe|
          is_room_exist = true if me.room_id == oe.room_id
        end
      end
      if is_room_exist
        # my_entries = Entry.where(user_id: sent_reaction.to_user_id)
        # other_entries = Entry.where(user_id: sent_reaction.from_user_id)
        my_entries.each do |me|
          other_entries.each do |oe|
            if me.room_id == oe.room_id
              room = Room.find_by(id: me.room_id)
              render json: room, status: 200
            end
          end
        end
      else
        room = Room.create
        Entry.create(room_id: room.id, user_id: sent_reaction.to_user_id)
        Entry.create(room_id: room.id, user_id: sent_reaction.from_user_id)
        room = Room.find_by(id: room.id)
        render json: room, status: 200
      end
    end
  end

  private

    def reaction_params
      params.require(:reaction).permit(:from_user_id, :to_user_id)
    end
end
