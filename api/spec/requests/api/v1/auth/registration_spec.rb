require 'rails_helper'

RSpec.describe "api v1 auth registration", type: :request do
  describe "post singup" do
    let(:email){"test@mail.com"}
    let(:password){"password"}
    it 'user model test' do
      post(api_v1_user_registration_path, params:{email: email,password: password})
      expect(response.status).to eq 200
    end
    it 'user model test' do
      post(api_v1_user_registration_path, params:{email: email,password: password})
      expect(JSON.parse(response.body)["data"]["uid"]).to eq email
      # byebug
      # expect(response.body).to eq 200
    end
    it 'user model test' do
      expect do
        post(api_v1_user_registration_path, params:{email: email,password: password})
      end.to change(User, :count).by 1
    end
  end
end
