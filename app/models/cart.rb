class Cart < ApplicationRecord
  has_many :cart_products, dependent: :destroy
  has_many :products, through: :cart_products
  accepts_nested_attributes_for :products

  def add_product(product)
    current_item = cart_products.find_by(product_id: product.id)
    if current_item
      current_item.increment(:quantity)
    else
      current_item = cart_products.build(product_id: product.id)
    end
    current_item
  end

  def total_price
    cart_products.to_a.sum {|item| item.total_price }
  end
end