(function() {
	'use strict';
	costo_app.factory('cart_services', ['$cookies', 'storage_services',
		function($cookies, storage_services) {

            var cart = {
                items:[],
                price:0
            };
			return {
				add_to_cart:function(item, quantity){
                    //console.log(value);
                    console.log(item);
                    var get_row_index = get_row_id(cart.items, 'id', item.id);
                    if(get_row_index != '-1'){
                        console.log('1');
                        cart.items[get_row_index].quantity += quantity
                        if(cart.items[get_row_index].quantity == 0){
                            cart.items.splice(get_row_index, 1);
                        }
                    }else{
                        item.quantity = quantity;
                        cart.items.push(item);
                    };
                    cart.price += item.price*quantity
                    console.log(cart);
                    storage_services.set_object_cookie('cart', cart);
					//$cookies.putObject(key, value);
					//cconsole.log($cookies.getObject(key));
				},
				remove_from_cart:function(item_id){
					//console.log(value);
					$cookies.put(key, value);
					console.log($cookies.get(key));
				},
				get_cart:function(){
                    var cart = storage_services.get_object_cookie('cart');
					return cart;
				}
			};
		}
	]);
})();
