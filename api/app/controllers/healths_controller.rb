# ヘルスチェック用
class HealthsController < ActionController::Base
  def show
    head :ok
  end
end
