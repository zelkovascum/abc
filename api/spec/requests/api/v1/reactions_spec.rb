require 'rails_helper'

RSpec.describe 'Api::V1::Reactions', type: :request do
  describe 'post /api/v1/reactions' do
    context 'normal' do
      let(:password) { 'password' }
      let(:user) { create(:user, password:) }
      let(:other_user) { create(:user) }

      before do
        @auth_headers = login(user.email, 'password')
      end

      context 'There is no reaction from the other' do
        it 'http status code is created' do
          post(
            api_v1_reactions_path,
            headers: @auth_headers,
            params: { reaction: { from_user_id: user.id, to_user_id: other_user.id } }
          )
          expect(response).to have_http_status :created
        end

        it 'same params and json response in message' do
          post(
            api_v1_reactions_path,
            headers: @auth_headers,
            params: { reaction: { from_user_id: user.id, to_user_id: other_user.id } }
          )
          expect(JSON.parse(response.body)['message']).to eq('リアクションしました')
        end

        it 'reaction records increases' do
          expect do
            post(
              api_v1_reactions_path,
              headers: @auth_headers,
              params: { reaction: { from_user_id: user.id, to_user_id: other_user.id } }
            )
          end.to change(Reaction, :count).by 1
        end

        it 'matched is false' do
          post(
            api_v1_reactions_path,
            headers: @auth_headers,
            params: { reaction: { from_user_id: user.id, to_user_id: other_user.id } }
          )
          expect(Reaction.last.matched).to be false
        end
      end
    end
  end
end
