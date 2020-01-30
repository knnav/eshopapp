class CartsController < ApplicationController
  before_action :set_cart

  def show
    @cart_products = @cart.products.to_a
    respond_to do |format|
      format.json
    end
  end

  def edit

  end

  def add_to_cart
    product = Product.find(params[:product_id])
    @cart.products << product
    cart_product = get_cart_product_by_id(params[:product_id])
    cart_product[:quantity] += 1
    if cart_product.save
      respond_to do |format|
        format.json {}
      end
    end
  end

  private
    def get_cart_product_by_id(product_id)
      @cart.cart_products.where(product_id: product_id).first
    end
end