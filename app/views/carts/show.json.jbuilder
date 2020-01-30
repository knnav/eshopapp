#json.array! @cart_products do |cart_product|
#  json.name cart_product.name
#  json.price cart_product.price
#  json.quantity 1
#  json.cart_id @cart.id
#end

json.array! @cart_products.each do |product|
  json.name product.name
  json.price product.price
  json.quantity product.quantity
  json.cart_id @cart.id
end