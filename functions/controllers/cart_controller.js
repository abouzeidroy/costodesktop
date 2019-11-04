(function (){
	'use strict';
	costo_app.controller('cart_controller', ['$scope','$timeout','$q','costo_services', '$location','cart_services', 'storage_services',
		function($scope, $timeout, $q, costo_services, $location, cart_services, storage_services) {
            $scope.cart = storage_services.get_object_cookie('cart');
			$scope.add_to_cart = function(product, quantity){
				product.loading = true;
				cart_services.add_to_cart(product, quantity);
				$timeout(function(){
					$scope.cart = storage_services.get_object_cookie('cart');
					product.loading = false;
                    if($scope.cart.items.length == 0){
                        $location.path('/');
                    }
				}, 200)
			}
			$scope.remove_all_items = function(){
				cart_services.empty_cart()
				$timeout(function(){
					$scope.cart = storage_services.get_object_cookie('cart');
					//product.loading = false;
                    if($scope.cart.items.length == 0){
                        $location.path('/');
                    }
				}, 200)
			}
		}
	]);
})();
			/*$('#fullpage').fullpage({
				navigation': false,
				navigationPosition': 'right',
				navigationTooltips': ['Categories', 'Video', 'New Arrivals', 'Latest Offers', 'Highlighted Products', 'Facebook Feeds']
			});*/