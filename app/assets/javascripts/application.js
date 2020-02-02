// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require materialize
//= require activestorage
//= require turbolinks
//= require_tree .

document.addEventListener('turbolinks:load', function() {
  var elems = document.querySelectorAll('.modal');
  var cartModal = $('#modal1');
  var cartTrigger = $('.cart-trigger');
  var cartClose = $('.cart-close');
  var addToCartBtn = $('.add-to-cart');
  var cartContent = $("#cart-content");
  var populateCart;
  var instances = M.Modal.init(elems);
  var totalPriceTag = $('.total');

  
  //this is just a placeholder, but it does the job for now...
  function createProdDiv(product){
    var code = "<div class=\"product\">\
                  <p>" + product["name"] + "-" + product["quantity"] + "</p>\
    </div>";
    return code;
  };

  function updateTotalPrice(newPrice){
    var priceText = "TOTAL: $"
    totalPriceTag.text(priceText + newPrice);
  }

  function populateCart(cartProducts){
    //for some reason this won't work with a for each loop
    for (var i = 0; i < cartProducts.length; i++)
    {
      $("#cart-content").append(createProdDiv(cartProducts[i]));
    }
  };


  // cart trigger handler for ajax stuff
  cartTrigger.on('click', function(){
    $.ajax({
      url: '/mycart'
    }).done(function(results){
      var total = results.total_price;
      var products = results.products;
      clearCart(cartContent);
      populateCart(products);
      updateTotalPrice(total);
    });
  });


  //trigger for add to cart buttons
  addToCartBtn.on('click', function(){
    var url = 'add_to_cart/' + $(this).data('pid')
    $.ajax({
      url: url
    });
  });


  function clearCart(cart){
    cart.empty();
  };
});


