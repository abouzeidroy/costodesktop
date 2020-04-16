(function() {
	'use strict';
	costo_app.factory('cart_services', ['$cookies', 'storage_services',
		function($cookies, storage_services) {

            var cart = {
                items:[] || storage_services.get_object_cookie('cart'),
                regular_price:0
            };
			return {
				add_to_cart:function(item, quantity){
                    storage_services.set_object_cookie('cart', cart);
				},
				remove_from_cart:function(item_id){
					$cookies.put(key, value);
				},
				get_cart:function(){
                    var cart = storage_services.get_object_cookie('cart');
					return cart;
                },
                empty_cart: function(){
                    cart = {
                        items:[],
                        regular_price:0
                    };
                    storage_services.set_object_cookie('cart', cart);
                }
			};
		}
	]);
})();
