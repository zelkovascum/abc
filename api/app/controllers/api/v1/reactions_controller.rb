class Api::V1::ReactionsController < ApplicationController
  # from_user_id リアクションをした人
  # to_user_id   リアクションをされた人
  def index
    received_reactions = Reaction.where(to_user_id: current_api_v1_user.id, matched: false).order(created_at: :desc)
    reaction_users = received_reactions.map { |reaction| reaction.from_user }
    render json: reaction_users, status: :ok
  end

  # リアクション&ルーム作成
  def create
    is_room_exist = false
    sent_reaction = Reaction.find_or_create_by(reaction_params)
    received_reaction = Reaction.find_by(
      from_user_id: sent_reaction.to_user_id,
      to_user_id: sent_reaction.from_user_id
    )
    unless received_reaction
      render json: { message: 'リアクションしました' }, status: :created
      return
    end

    sent_reaction.update(matched: true)
    received_reaction.update(matched: true)
    my_entries = Entry.where(user_id: sent_reaction.to_user_id)
    other_entries = Entry.where(user_id: sent_reaction.from_user_id)
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
            render json: { room:, message: '既にマッチしています' }, status: :ok
          end
        end
      end
    else
      room = Room.create
      Entry.create(room_id: room.id, user_id: sent_reaction.to_user_id)
      Entry.create(room_id: room.id, user_id: sent_reaction.from_user_id)
      room = Room.find_by(id: room.id)
      render json: { room:, message: 'マッチしました' }, status: :created
    end
  end

  private

    def reaction_params
      params.require(:reaction).permit(:from_user_id, :to_user_id)
      # from_user_id → current_user
      # params.require(:reaction).permit(:to_user_id)
    end
end
