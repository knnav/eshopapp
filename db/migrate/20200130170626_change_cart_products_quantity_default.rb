class ChangeCartProductsQuantityDefault < ActiveRecord::Migration[5.2]
  def change
    change_column_default :cart_products, :quantity, 0
  end
end
