class CartProductsController < ApplicationController
  before_action :set_cart, only: [:create, :destroy]

  def create
    @cart.add_products(params)
    if @cart.save
      redirect_to cart_path
    else
      redirect_to @product
    end
  end
end