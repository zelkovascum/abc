class Api::V1::ReactionsController < ApplicationController
  # from_user_id リアクションをした人
  # to_user_id   リアクションをされた人
  def index
    reactions = Reaction.where(to_user_id: current_api_v1_user.id)
    render json: reactions, status: 200,
  end

  # def create
  #   is_matched = false # マッチングが成立したかどうかのフラグ
  #   reaction = Reaction.find_or_initialize_by(to_user_id: params[:user_id], from_user_id: current_api_v1_user.id)
  #   if reaction.new_record?
  #     if reaction.save # 新規データなら保存
  #       is_matched = true
  #       render json: is_matched, status: 200
  #     else
  #       render json: { message: "作成に失敗しました" }, status: 500
  #     end
  #   else
      
  #     render json: {}, status: 200
  #   end
  # end
  
  private

    def like_params
      params.permit(:from_user, :to_user)
    end
end
