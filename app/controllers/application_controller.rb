class ApplicationController < ActionController::Base
  def set_cart
    begin
      @cart = Cart.where(id: session[:cart_id]).includes(:products).first #check if cart exists for the current session
    rescue ActiveRecord::RecordNotFound
      @cart = Cart.create
      session[:cart_id] = @cart.id
    end
  end
end
