Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[create]
      patch '/buy', to: 'users#buy_stock'
      get '/logged_in', to: 'sessions#login_status'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'

      resources :stocks, only: [:index]
    end
  end
end
