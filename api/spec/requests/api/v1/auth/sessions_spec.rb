require 'rails_helper'

RSpec.describe 'api v1 auth session', type: :request do
  let(:email) { 'test@mail.com' }
  let(:password) { 'password' }
  # userのpasswordに'password'を指定
  let(:user) { create(:user, password:) }
  describe 'post signin' do
    context 'normal' do
      it 'the response is 200' do
        # user作成時パスワードに :password を指定したためここで使う  user.password はハッシュ化されているため使えない
        post(api_v1_user_session_path, params: { email: user.email, password: })
        expect(response.status).to eq 200
      end

      it 'access-token exists in header' do
        post(api_v1_user_session_path, params: { email: user.email, password: })
        expect(response.header['access-token']).not_to eq nil
      end

      it 'client exists in header' do
        post(api_v1_user_session_path, params: { email: user.email, password: })
        expect(response.header['client']).not_to eq nil
      end
    end

    context 'abnormal' do
      it 'Response 401 if email do not match' do
        post(api_v1_user_session_path, params: { email: 'error@mail.com', password: 'wordpass' })
        expect(response.status).to eq 401
      end

      it 'Response 401 if password do not match' do
        post(api_v1_user_session_path, params: { email: user.email, password: 'wordpass' })
        expect(response.status).to eq 401
      end

      it 'uid exists in header' do
        post(api_v1_user_session_path, params: { email: user.email, password: })
        headers = response.header.slice('access-token', 'client', 'uid')
        expect(response.header['uid']).not_to eq nil
      end
    end
  end

  describe 'delete signout' do
    context 'normal' do
      it 'the response is 200' do
        post(api_v1_user_session_path, params: { email: user.email, password: })
        headers = response.header.slice('access-token', 'client', 'uid')
        delete(destroy_api_v1_user_session_path, headers:)
        expect(response.status).to eq 200
      end
    end

    context 'abnormal' do
      it 'response 404 if access-token does not match' do
        post(api_v1_user_session_path, params: { email: user.email, password: })
        headers = response.header.slice('access-token', 'client', 'uid')
        delete(destroy_api_v1_user_session_path, params: { 'access-token' => 'access-token', 'client' => headers['client'], 'uid' => headers['uid'] })
        expect(response.status).to eq 404
      end

      it 'response 404 if client does not match' do
        post(api_v1_user_session_path, params: { email: user.email, password: })
        headers = response.header.slice('access-token', 'client', 'uid')
        delete(destroy_api_v1_user_session_path, params: { 'access-token' => headers['access-token'], 'client' => 'client', 'uid' => headers['uid'] })
        expect(response.status).to eq 404
      end

      it 'response 404 if uid does not match' do
        post(api_v1_user_session_path, params: { email: user.email, password: })
        headers = response.header.slice('access-token', 'client', 'uid')
        delete(destroy_api_v1_user_session_path, params: { 'access-token' => headers['access-token'], 'client' => headers['client'], 'uid' => 'uid' })
        expect(response.status).to eq 404
      end
    end
  end
end
