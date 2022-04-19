Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users do
        member do
          resources :rooms, only: %i[create]
        end
      end

      resources :posts

      # resources :rooms, only: %i[show index] do
      resources :rooms, only: %i[show index create] do
        member do
          resources :messages, only: %i[create]
        end
      end

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
