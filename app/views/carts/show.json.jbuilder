json.array! @cart_products do |cart_product|
  json.name cart_product.name
  json.price cart_product.price
  json.quantity @cart.cart_products.where(product_id: cart_product.id).first.quantity
end