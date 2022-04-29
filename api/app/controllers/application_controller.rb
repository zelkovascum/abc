class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken

  # CSRFトークン検証をスキップする
  skip_before_action :verify_authenticity_token
  # viewでもcontrollerのメソッドを使いたいときはhelper_methodを使う
  helper_method :current_user, :user_signed_in?, :authenticate_user!
end
