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
  var instances = M.Modal.init(elems);
  var cartTrigger = $('.cart-trigger');
  var addToCartBtn = $('.add-to-cart');
  var populateCart;

  //this is just a placeholder, but it does the job for now...
  function createProdDiv(product){
    //product = JSON.parse(product);
    //console.log(typeof(product))
    var code = "<div class=\"product\">\
                  <p>" + product["name"] + "-" + product.quantity + "</p>\
    </div>";
    return code;
  };
  function populateCart(cartProducts){
    console.log(cartProducts[0]);
    for (var i = 0; i < cartProducts.length; i++)
    {
      console.log(cartProducts[i]);
      $("#cart-content").append(createProdDiv(cartProducts[i]));
    }
  };

  // cart trigger handler for ajax stuff
  cartTrigger.on('click', function(){
    $.ajax({
      url: '/mycart'
    }).done(function(results){
      //r = JSON.parse(results);
      populateCart(results);
    });
  });

  //trigger for add to cart buttons
  addToCartBtn.on('click', function(){
    var url = 'add_to_cart/' + $(this).data('pid')
    $.ajax({
      url: url
    });
  });

});


