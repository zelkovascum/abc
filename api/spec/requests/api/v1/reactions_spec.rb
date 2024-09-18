require 'rails_helper'

RSpec.describe 'Api::V1::Reactions', type: :request do
  describe 'post /api_v1_reactions_path' do
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

      context 'There is a reaction from the other' do
        let(:reaction) { create(:reaction, from_user_id: other_user.id, to_user_id: user.id) }
        before { reaction }

        it 'http status code is created' do
          post(
            api_v1_reactions_path,
            headers: @auth_headers,
            params: { reaction: { from_user_id: user.id, to_user_id: other_user.id } }
          )
          expect(response).to have_http_status :created
        end

        it 'same params and json response in room' do
          post(
            api_v1_reactions_path,
            headers: @auth_headers,
            params: { reaction: { from_user_id: user.id, to_user_id: other_user.id } }
          )
          expect(JSON.parse(response.body)['room']).not_to be nil
        end

        it 'same params and json response in message' do
          post(
            api_v1_reactions_path,
            headers: @auth_headers,
            params: { reaction: { from_user_id: user.id, to_user_id: other_user.id } }
          )
          expect(JSON.parse(response.body)['message']).to eq('マッチしました')
        end

        it 'room records increases' do
          expect do
            post(
              api_v1_reactions_path,
              headers: @auth_headers,
              params: { reaction: { from_user_id: user.id, to_user_id: other_user.id } }
            )
          end.to change(Room, :count).by 1
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

        it 'entries increases' do
          expect do
            post(
              api_v1_reactions_path,
              headers: @auth_headers,
              params: { reaction: { from_user_id: user.id, to_user_id: other_user.id } }
            )
          end.to change(Entry, :count).by 2
        end

        it 'The match of the last added record is true' do
          post(
            api_v1_reactions_path,
            headers: @auth_headers,
            params: { reaction: { from_user_id: user.id, to_user_id: other_user.id } }
          )
          expect(Reaction.last.matched).to be true
        end

        it 'The match of the changed record is true' do
          post(
            api_v1_reactions_path,
            headers: @auth_headers,
            params: { reaction: { from_user_id: user.id, to_user_id: other_user.id } }
          )
          expect(reaction.reload.matched).to be true
        end
      end

      # context 'reaction 済' do
      #   it 'http status code is ok' do
      #     post(
      #       api_v1_reactions_path,
      #       headers: @auth_headers,
      #       params: { reaction: { from_user_id: user.id, to_user_id: other_user.id } }
      #     )
      #     expect(response).to have_http_status :ok
      #   end
      #   it 'same params and json response in room'
      #   it 'same params and json response in message'
      #   it 'room records 増えない'
      #   it 'reaction records 増えない'
      # end
    end

    # context 'abnormal' do
      # let(:other_user) { create(:user) }
      # context 'params 不正' do
      #   it 'http status code bad_request' do
      #     post(
      #       api_v1_reactions_path,
      #       headers: @auth_headers,
      #       params: { reaction: { from_user_id: 'a', to_user_id: "other_user.id" } }
      #     )
      #     expect(response).to have_http_status :bad_request
      #   end

      #   it 'room records 増えない'
      #   it 'reaction records 増えない'
      # end

    #   context 'not login user' do
    #     it 'http status code is bad_request' do
    #       post(
    #         api_v1_reactions_path,
    #         # headers: @auth_headers,
    #         params: { reaction: { from_user_id: nil, to_user_id: other_user.id } }
    #       )
    #       expect(response).to have_http_status :bad_request
    #     end

    #     it 'room records 増えない'
    #     it 'reaction records 増えない'
    #   end
    # end
  end
end
