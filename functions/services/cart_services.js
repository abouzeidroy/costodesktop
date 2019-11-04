(function() {
	'use strict';
	costo_app.factory('cart_services', ['$cookies', 'storage_services',
		function($cookies, storage_services) {

            var cart = {
                items:[] || storage_services.get_object_cookie('cart'),
                price:0
            };
			return {
				add_to_cart:function(item, quantity){
                    var get_row_index = get_row_id(cart.items, 'id', item.id);
                    if(get_row_index != '-1'){
                        cart.items[get_row_index].quantity += quantity
                        if(cart.items[get_row_index].quantity == 0){
                            cart.items.splice(get_row_index, 1);
                        }
                    }else{
                        item.quantity = quantity;
                        cart.items.unshift(item);
                    };
                    cart.price += item.price*quantity
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
                        price:0
                    };
                    storage_services.set_object_cookie('cart', cart);
                }
			};
		}
	]);
})();
