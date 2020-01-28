class ApplicationController < ActionController::Base
  def set_cart
    begin
      @cart = Cart.find(session[:cart_id]) #check if cart exists for the current session
    rescue ActiveRecord::RecordNotFound
      @cart = Cart.create
      session[:cart_id] = @cart.id
    end
  end
end
