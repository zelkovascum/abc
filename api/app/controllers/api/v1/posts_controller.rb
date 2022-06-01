class Api::V1::PostsController < ApplicationController
  before_action :authenticate_api_v1_user!, only: %i[create update destroy]

  def index
    posts = if params[:is_my_posts] == 'true'
              Post.where(user_id: current_api_v1_user.id).where('date_time >= ?', Time.zone.now).order(date_time: :asc)
            else
              Post.where.not(user_id: current_api_v1_user.id).where('date_time >= ?', Time.zone.now).order(date_time: :asc)
            end
    posts_array = posts.map do |post|
      {
        id: post.id,
        user: User.find_by(id: post.user_id),
        lat: post.lat,
        lng: post.lng,
        place: post.place,
        date_time: post.date_time,
        content: post.content
      }
    end
    render json: posts_array
  end

  def show
    post = Post.find(params[:id])
    post_info = {
      id: post.id,
      user: post.user,
      lat: post.lat,
      lng: post.lng,
      place: post.place,
      date_time: post.date_time,
      content: post.content
    }
    render json: post_info
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: post
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  def update
    post = Post.find(params[:id])
    if current_api_v1_user.id == post.user_id
      if post.update(post_params)
        render json: post
      else
        render json: post.errors, status: :unprocessable_entity
      end
    else
      render json: { message: 'can not update data' }, status: :unprocessable_entity
    end
  end

  def destroy
    post = Post.find(params[:id])
    if current_api_v1_user.id == post.user_id
      post.destroy
      render json: post
    else
      render json: { message: 'can not delete data' }, status: :unprocessable_entity
    end
  end

  private

    def post_params
      params.require(:post).permit(:lat, :lng, :place, :date_time, :content).merge(user_id: current_api_v1_user.id)
    end
end
