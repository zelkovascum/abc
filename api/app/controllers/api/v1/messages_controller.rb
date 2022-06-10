class Api::V1::MessagesController < ApplicationController
  before_action :authenticate_api_v1_user!

  def create
    # message = Message.new(user_id: current_api_v1_user.id, room_id: params[:id], content: params[:content], image: params[:image])
    message = Message.new(message_params)
    if message.save
      render json: message, status: :created
    else
      render json: message.errors, status: :bad_request
    end
  end

  # def download
  #   message = Message.find(download_params[:id])
  #   data = open("https://#{AWS_S3_BUCKET_NAME}.s3.ap-northeast-1.amazonaws.com/uploads/#{message.file.file.filename}")
  #   image = message.image # imageはFugaUploaderオブジェクト
  #   send_data(data.read, filename: "download#{File.extname(image.path)}")
  # end

  private

    def message_params
      params.permit(:user_id, :room_id, :content, :image).merge(user_id: current_api_v1_user.id)
    end

    # def download_params
    #   params.permit(:id)
    # end
end
