/*
* cart.js
* author: knnav
* 
* So, this is a small script for handling the shopping cart front end of the app,
* and, basically, that's it.
*
* I'm sorry for the messy comments, but i'd rather go back here in 6 months and
* actually know what every little thing does without having to skin through my own code.
*
*/



//gotta wait for that turbolinks stuff to load
document.addEventListener('turbolinks:load', function() {

  //Initialize elements
  
  //These two are MaterializeCss init lines for the cart modal to actually work
  const elems = document.querySelectorAll('.modal');
  const instances = M.Modal.init(elems);


  const cartModal = $('#modal1');             //This is the actual cart modal (small TODO: change this to a more descriptive id)
  const cartTrigger = $('.cart-trigger');     //The button(s) that trigger the cart modal
  const cartClose = $('.cart-close');         //The cart modal's closing button
  const addToCartBtn = $('.add-to-cart');     //This one is self explanatory..
  const cartContent = $("#cart-content");     //The div for the cart content
  const totalPriceTag = $('.total');          //the tag that holds the total price value

  
  //this is still a placeholder, but for ES6 (it looks quite nicer than the original one i had though)
  const createProdDiv = (product)=>{
    let code = `<div class="product">\
                  <p>${product.name} - ${product.quantity}</p>\
                </div>`;
    return code;
  }

  //this updates the total price element with the new price brought by the API
  const updateTotalPrice = (newPrice)=>{
    let priceText = "TOTAL: $";
    totalPriceTag.text(priceText + newPrice);
  }

  //fills the cart contents div with the items brought by the API
  const populateCart = (cartProducts)=> cartProducts.forEach(el => $("#cart-content").append(createProdDiv(el)));

  //clears the cart contents div (mostly for cleanup purposes)
  const clearCart = (cart)=> cart.empty();

  // cart trigger handler for ajax stuff
  cartTrigger.on('click', function(){
    $.ajax({
      url: '/mycart'
    }).done(function(results){
      let total = results.total_price;
      let products = results.products;
      clearCart(cartContent);
      populateCart(products);
      updateTotalPrice(total);
    });
  });


  //trigger for add to cart buttons
  addToCartBtn.on('click', function(){
    const url = 'add_to_cart/' + $(this).data('pid')
    $.ajax({
      url: url
    });
  });

});


