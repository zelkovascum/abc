module LoginHelper
  def login(email, password)
    post(
      api_v1_user_session_path,
      params: { email:, password: }
    )
    response.header.slice('access-token', 'client', 'uid')
  end
end

RSpec.configure do |config|
  config.include LoginHelper, type: :request
end
