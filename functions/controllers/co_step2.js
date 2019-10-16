(function (){
	'use strict';
	costo_app.controller('co_step2', ['$scope','$timeout','$q','costo_services','$filter','storage_services','$cookies','$location','Notification',
		function($scope, $timeout, $q, costo_services, $filter, storage_services, $cookies, $location, Notification) {
			$scope.cookie_session = $cookies.get('session_id');
			if($cookies.getObject('personal_info')){
				$scope.page_values = $cookies.getObject('personal_info');
				console.log($scope.page_values);
			}else{
				$scope.page_values = {
					name: '',
					middle_name: '',
					family_name: '',
					gender: 0,
					email: '',
					username: '',
					password: ''
				};
			}
			
			$scope.billing_form_enabled = true;
			$scope.delivery_form_enabled = true;
			
			$scope.new_delivery_info = {
				'Name': ''
			}
			$scope.new_billing_info = {
				'Name': ''
			}

			
			function init(){
				var deferred = $q.defer();
				// Get Categories
				var promise1 = get_addresses();
				var promise2 = get_countries();
				// Return a promise
				$q.all([promise1, promise2]).then(function(){
					// All promises are loaded 
					deferred.resolve();
				});
				return deferred.promise;
			}
			
			function get_addresses(){
				var deferred = $q.defer();
				costo_services.get_addresses().then(function(response){
					$scope.addresses = response.Data.Addresses;
					$scope.addresses.unshift({'Name':'Add new address', 'ID':0})
					deferred.resolve();
				}, function(){
					deferred.reject();
				});
				return deferred.promise;
			}
			
			function get_countries(){
				var deferred = $q.defer();
				costo_services.get_countries().then(function(response){
					$scope.countries = response.Data.Countries;
					angular.forEach($scope.countries, function(value, key){
						//value.text = value.Title;
						//value.value = value.Value;
					});
					deferred.resolve();
				}, function(){
					deferred.reject();
				});
				return deferred.promise;
			}
			
			$scope.check_if_same = function(item){
				var matched = false;
				angular.forEach($scope.original_addresses, function(value, key){
					if(item===value){
						matched=true
					}
				})
				return matched;
			}
			
			
			$scope.$watch('delivery_info', function(){
				if($scope.delivery_info){
					if($scope.delivery_info.ID == 0){
						
						/****1Add new Address is clicked*****/
						$scope.delivery_form_enabled = true;
						$scope.new_delivery_info = {};
					}else{
						$scope.delivery_form_enabled = false;
						$scope.new_delivery_info = $scope.delivery_info;
					}
				}
			}, true);
			$scope.$watch('billing_info', function(){
				if($scope.billing_info){
					if($scope.billing_info.ID == 0){
						/****Add new Address is clicked*****/
						$scope.billing_form_enabled = true;
						$scope.new_billing_info = {};
					}else{
						$scope.billing_form_enabled = false;
						$scope.new_billing_info = $scope.billing_info;
					}
				}
			}, true);
			
			$scope.compare_delivery_address = function(){
				console.log('addresses_response');
				console.log($scope.original_addresses);
				console.log($scope.delivery_info);
			};
			
			
			$scope.submit_registration = function(value){
				var submittedAddresses = 0
				if(value){
					$scope.addresses_object = []
					if($scope.billing_form_enabled == false && $scope.delivery_form_enabled == false){
						$scope.page_values.ShippingAddressID = $scope.new_delivery_info.ID;
						$scope.page_values.BillingAddressID = $scope.new_billing_info.ID;
						$scope.create_order()
					}else{
						if($scope.delivery_form_enabled == true){
							console.log($scope.new_delivery_info);
							var address_object = {
								"Session": $cookies.get('session_id'),
								"UserAgent": navigator.userAgent,
								"NewAddress": {
									"Address": $scope.new_delivery_info.Address,
									"Building": $scope.new_delivery_info.Building,
									"City": $scope.new_delivery_info.City,
									"CityID": 0,
									"CountryID": $scope.new_delivery_info.CountryID.ID,
									"Email": 'ramiabouzeid87@hotmail.com',
									"ID": 0,
									"Name": $scope.new_delivery_info.Name,
									"Phone": $scope.new_delivery_info.Phone,
									"Street": $scope.new_delivery_info.Street,
									"UserAgent": navigator.userAgent,
									"type": 1
								}
							}
							console.log(address_object);
							$scope.addresses_object.push(address_object);
						}else{
							submittedAddresses += 1;
							$scope.page_values.ShippingAddressID = $scope.new_delivery_info.ID;
						}
						if($scope.billing_form_enabled == true){
							var address_object = {
								"Session": $cookies.get('session_id'),
								"UserAgent": navigator.userAgent,
								"NewAddress": {
									"Address": $scope.new_billing_info.Address,
									"Building": $scope.new_billing_info.Building,
									"City": $scope.new_billing_info.City,
									"CityID": 0,
									"CountryID": $scope.new_billing_info.CountryID.ID,
									"Email": 'ramiabouzeid87@hotmail.com',
									"ID": 0,
									"Name": $scope.new_billing_info.Name,
									"Phone": $scope.new_billing_info.Phone,
									"Street": $scope.new_billing_info.Street,
									"UserAgent": navigator.userAgent,
									"type": 2
								}
							}
							$scope.addresses_object.push(address_object);
						}else{
							submittedAddresses += 1;
							$scope.page_values.BillingAddressID = $scope.new_billing_info.ID;
						}
						angular.forEach($scope.addresses_object, function(address_object){
							console.log(value)
							costo_services.put_address(address_object).then(function(response){
								if(response.Status == 1){
									Notification.success(response.Message);
									if(address_object.type==1){
										$scope.page_values.ShippingAddressID = response.AddedItemID;
									}
									if(address_object.type==2){
										$scope.page_values.BillingAddressID = response.AddedItemID;
									}
									submittedAddresses += 1;
									console.log(submittedAddresses)
									console.log(addresses_object.length)
									if(submittedAddresses == addresses_object.length){
										$scope.create_order()
									}
								}
							});
						})
					}
				}else{
					if($scope.billing_form_enabled = true){
						$scope.register_info.bill_address.$dirty = true;
						$scope.register_info.bill_city.$dirty = true;
						$scope.register_info.bill_name.$dirty = true;
						$scope.register_info.bill_street.$dirty = true;
						$scope.register_info.bill_building.$dirty = true;
						$scope.register_info.bill_phone.$dirty = true;
					}
					if($scope.delivery_form_enabled = true){
						$scope.register_info.deli_address.$dirty = true;
						$scope.register_info.deli_city.$dirty = true;
						$scope.register_info.deli_name.$dirty = true;
						$scope.register_info.deli_street.$dirty = true;
						$scope.register_info.deli_building.$dirty = true;
						$scope.register_info.deli_phone.$dirty = true;
					}
				}
			}
			
			
			$scope.create_order = function(){
				costo_services.create_order($scope.page_values.cardId, $scope.page_values.name, $scope.page_values.ShippingAddressID, $scope.page_values.BillingAddressID)
			}
			
			init();

		}
	]);
})();
			/*$('#fullpage').fullpage({
				navigation': false,
				navigationPosition': 'right',
				navigationTooltips': ['Categories', 'Video', 'New Arrivals', 'Latest Offers', 'Highlighted Products', 'Facebook Feeds']
			});*/