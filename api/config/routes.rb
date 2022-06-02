Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      # resources :users do
      #   member do
      #     resources :rooms, only: %i[create]
      #   end
      # end

      resources :posts, only: %i[index show create destroy]

      resources :rooms, only: %i[index show] do
        member do
          resources :messages, only: %i[create]
        end
      end

      resources :reactions, only: %i[index create]

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
  # ヘルスチェック用
  # curl localhost:3000/health -I
  resource :health, only: [:show]
end
