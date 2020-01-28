class CreateCartProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :cart_products do |t|
      t.belongs_to :product
      t.belongs_to :cart
      t.integer :quantity, default: 1
    end
  end
end
