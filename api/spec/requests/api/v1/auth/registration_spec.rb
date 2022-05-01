require 'rails_helper'

RSpec.describe "api v1 auth registration", type: :request do
  describe "post singup" do
    let(:email){"test@mail.com"}
    let(:password){"password"}
    let(:name){"ユーザー"}
    it 'The response of singup is 200' do
      post(api_v1_user_registration_path, params:{email:,password:,name:})
      expect(response.status).to eq 200
    end
    it 'Response 422 if password is less than 6 characters' do
      post(api_v1_user_registration_path, params:{email:,password: "passw",name:})
      expect(response.status).to eq 422
    end
    it 'singup uid is the same as email' do
      post(api_v1_user_registration_path, params:{email:,password:,name:})
      expect(JSON.parse(response.body)["data"]["uid"]).to eq email
    end
    it 'one more user with singup' do
      expect do
        post(api_v1_user_registration_path, params:{email:,password:,name:})
      end.to change(User, :count).by 1
    end
  end
end
