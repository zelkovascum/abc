class Api::V1::ReactionsController < ApplicationController
  # def index
  #   render json: {
  #     active_likes: current_api_v1_user.active_likes,  # 自分からのいいね
  #     passive_likes: current_api_v1_user.passive_likes # 相手からのいいね
  #   }, status: 200,
  # end

  def create
    is_matched = false # マッチングが成立したかどうかのフラグ



    # from_user_id リアクションをした人
    # to_user_id   リアクションをされた人
    reaction = Reaction.find_or_initialize_by(to_user_id: params[:user_id], from_user_id: current_api_v1_user.id)
    reaction.update(
      status: params[:reaction]
    )



    active_like = Reaction.find_or_initialize_by(like_params)
    passsive_like = Reaction.find_by(
      from_user_id: active_like.to_user_id, 
      to_user_id: active_like.from_user_id
    )
    
    if passsive_like # いいねを押した際、相手からのいいねがすでに存在する場合はマッチング成立
      chat_room = ChatRoom.create # メッセージ交換用の部屋を作成
      
      # 自分
      ChatRoomUser.find_or_create_by(
        chat_room_id: chat_room.id,
        user_id: active_like.from_user_id
      )
      
      # 相手
      ChatRoomUser.find_or_create_by(
        chat_room_id: chat_room.id,
        user_id: passsive_like.from_user_id
      )

      is_matched = true
    end

    if active_like.save
      render json: { status: 200, like: active_like, is_matched: is_matched }
    else
      render json: { status: 500, message: "作成に失敗しました" }
    end
  end
  
  private

    def like_params
      params.permit(:from_user, :to_user)
    end
end
