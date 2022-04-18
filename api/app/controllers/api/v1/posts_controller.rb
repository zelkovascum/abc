class Api::V1::PostsController < ApplicationController
  def index
    posts = Post.all.order(created_at: :desc)
    render json: {posts: posts}
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: post, status: :no_content
    else
      render json: {}, status: 422
    end
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end

  def update
    post = Post.find(params[:id])
    if post.update(post_params)
      render json: post
    else
      render json: post.errors, status: 422
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    render json: post
  end

  private

  def post_params
    params.require(:post).permit(:lat, :lng, :place, :date_time, :content)
  end
end
