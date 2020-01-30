class CartsController < ApplicationController
  before_action :set_cart

  def show
    @cart_products = @cart.get_products_with_quantity_and_price
    #maybe total price should've been an attribute of the cart itself
  end

  def edit

  end

  def add_to_cart
    cart_product = @cart.add_to_cart(params[:product_id])
    if cart_product
      respond_to do |format|
        format.json {}
      end
    end #here should be an else branch returning a 500
  end
end