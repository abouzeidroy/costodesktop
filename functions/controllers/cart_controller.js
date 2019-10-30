(function (){
	'use strict';
	costo_app.controller('cart_controller', ['$scope','$timeout','$q','costo_services', '$location','cart_services', 'storage_services',
		function($scope, $timeout, $q, costo_services, $location, cart_services, storage_services) {
            $scope.cart = storage_services.get_cookie('cart');
            console.log($scope.cart);
			$scope.add_to_cart = function(product, quantity){
				//console.log(item);
				cart_services.add_to_cart(product, quantity);
				$timeout(function(){
                    $scope.cart = storage_services.get_cookie('cart');
                    if($scope.cart.items.length == 0){
                        $location.path = '/';
                    }
				}, 500)
			}
		}
	]);
})();
			/*$('#fullpage').fullpage({
				navigation': false,
				navigationPosition': 'right',
				navigationTooltips': ['Categories', 'Video', 'New Arrivals', 'Latest Offers', 'Highlighted Products', 'Facebook Feeds']
			});*/