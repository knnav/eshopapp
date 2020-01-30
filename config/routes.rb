Rails.application.routes.draw do
  root 'products#index'
  devise_for :users
  resources :products
  #resources :carts, only: [:show]
  get 'mycart', to: 'carts#show'
  get 'add_to_cart/:product_id', to: 'carts#add_to_cart', as: 'add_to_cart'
end
