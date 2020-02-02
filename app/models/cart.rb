class Cart < ApplicationRecord
  has_many :cart_products, dependent: :destroy
  has_many :products, through: :cart_products
  accepts_nested_attributes_for :products

  #Builds a relationship between a Cart instance and a Product instance.
  #If the product already exists in that specific Cart instance, it just increments
  # the quantity attribute of the relationship.
  #
  #
  def add_product(product)
    current_item = cart_products.find_by(product_id: product.id)
    if current_item
      current_item.increment(:quantity)
    else
      current_item = cart_products.build(product_id: product.id)
    end
    current_item
  end

  #Calculates the sum of the prices of the Products of a specific Cart instance
  #
  def update_total_price(cart_products)
    self.total_price = 0
    cart_products.each do |product|
      self.total_price += product.total
    end
    self.save
  end

  def get_products_with_quantity_and_price
    self.products.select('products.*, count(*) as quantity, sum(products.price) as total').group(:id)
  end

  def add_to_cart(product_id)
    product = Product.find(product_id)
    self.products << product
    cart_product = get_cart_product_by_id(product_id)
    cart_product[:quantity] += 1
    if cart_product.save
      true
    else
      nil
    end
  end

  private
    def get_cart_product_by_id(product_id)
      @cart.cart_products.where(product_id: product_id).first
    end
end