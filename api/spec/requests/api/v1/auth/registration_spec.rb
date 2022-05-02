require 'rails_helper'

RSpec.describe 'api v1 auth registration', type: :request do
  let(:email) { 'test@mail.com' }
  let(:password) { 'password' }
  let(:name) { 'ユーザー' }
  describe 'post singup' do
    context 'normal' do
      it 'response of singup is 200' do
        post(api_v1_user_registration_path, params: { email:, password:, name: })
        expect(response.status).to eq 200
      end

      it 'singup uid is the same as email' do
        post(api_v1_user_registration_path, params: { email:, password:, name: })
        expect(JSON.parse(response.body)['data']['uid']).to eq email
      end

      it 'user records increases' do
        expect do
          post(api_v1_user_registration_path, params: { email:, password:, name: })
        end.to change(User, :count).by 1
      end
    end

    context 'abnormal' do
      it 'email is incorrect' do
        post(api_v1_user_registration_path, params: { email: 'mail', password:, name: })
        expect(response.status).to eq 422
      end

      it 'password is less than 6 characters' do
        post(api_v1_user_registration_path, params: { email:, password: 'passw', name: })
        expect(response.status).to eq 422
      end

      it 'records will not increase if email is invalid' do
        expect do
          post(api_v1_user_registration_path, params: { email: 'mail', password:, name: })
        end.to change(User, :count).by 0
      end

      it 'records will not increase if password is invalid' do
        expect do
          post(api_v1_user_registration_path, params: { email:, password: 'passw', name: })
        end.to change(User, :count).by 0
      end
    end
  end
end
