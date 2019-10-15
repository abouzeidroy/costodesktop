(function() {
	'use strict';
	ohmybox_app.factory('omb_services', ['$http', '$q','$cookies',
		function($http, $q, $cookies) {

			
			function http_call(options){
				var deferred = $q.defer();
				// Proxy
				var method = options.method;
				var endpoint = options.endpoint;
				var app_token = options.app_token;
				var params = options.params;
				var return_result = options.return_result;
				var return_response = options.return_response;
				var return_user_message = options.return_user_message;
				// Fill the data
				var domain = 'https://woocommerce.dekkanjeh.com/wp-json';
				var endpoint_url = domain + endpoint;
				var url = endpoint_url;
				var headers = {
					'Content-Type' : 'text/plain'
				};
				var json_params = {
					consumer_key:'ck_88ef47c27b0c4bb988a2216cc5a5924c3599c98b',
					consumer_secret:'cs_348fe0b1cd6eba0ba31ed486d18e2415654f9475'
					//'format' : get_config_data('default_api_format')
				};
				var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

				//if(typeof account_token != 'undefined'){
					headers['Authorization'] = 'Basic ' + Base64.encode(json_params.consumer_key + ":" + json_params.consumer_secret);
				//}
				if(typeof params != 'undefined'){
					if(Object.keys(params).length > 0){
						angular.forEach(params, function(value, key){
						  json_params[key] = value;
						});
					}
				}
				$http({
					method: method,
					url: url,
					params: params,
					headers: headers,
					data: JSON.stringify(params)
				}).then(function(response) {
					// Success
					if(return_response == 1){
						deferred.resolve(response.data);
					} else {
						if(handle_ajax_response(response.data, response.status, response.headers, response.config)){
							if(typeof return_result != 'undefined'){
								if(return_result == 1){
									deferred.resolve(response.data.result);
								} else {
									deferred.resolve(response.data);
								}
							} else if(typeof return_user_message == 1){
								if(return_user_message == 1){
									deferred.resolve(response.data.user_message);
								} else {
									deferred.resolve(response.data);
								}
							} else {
								deferred.resolve(response.data);
							}
						} else {
							console.log(response);
							deferred.reject(response.data);
						}
					}
				}, function(response) {
					if(return_response == 1){
						deferred.resolve(response.data);
					} else {
						handle_ajax_response(response.data, response.status, response.headers, response.config);
						deferred.reject(response.status);
					}
				});
				return deferred.promise;
			}

			return {
				get_categories: function() {
					var endpoint = '/GetCategories/en';
					var options = {'method' : 'POST', 'endpoint' : endpoint, 'return_result' : '1', 'return_response' : '1'};
					return http_call(options);
				},
				get_menus: function() {
					var endpoint = '/GetMenu/en';
					var options = {'method' : 'POST', 'endpoint' : endpoint, 'return_result' : '1', 'return_response' : '1'};
					return http_call(options);
				},
				get_homepage_data: function() {
					var endpoint = '/gethomepagedata/en';
					var options = {'method' : 'POST', 'endpoint' : endpoint, 'return_result' : '1', 'return_response' : '1'};
					return http_call(options);
				},
				do_login: function(email, password) {
					var params = {'Email' : email, 'Password':password,'Longtitude':0.0, 'Latitude':0.0, 'UserAgent':navigator.userAgent};
					var endpoint = '/login/en';
					var options = {'method' : 'POST', 'endpoint' : endpoint, 'params' : params, 'return_response' : '1'};
					return http_call(options);
				},
				get_addresses: function(email, password) {
					var params = {'Session' : $cookies.get('session_id'), 'UserAgent':navigator.userAgent};
					//var params = {'Session' : 'b9358d80-f738-4c0a-8125-0882be67f028', 'UserAgent':navigator.userAgent};
					var endpoint = '/GetAddresses/en';
					var options = {'method' : 'POST', 'endpoint' : endpoint, 'params' : params, 'return_response' : '1'};
					return http_call(options);
				},
				register_user: function(City, CityID, CountryID, DateOfBirth, Email, FirstName, Gender, LastName, MiddleName, Password, Phone, UserAgent, Latitude, Longtitude, n_Address, n_Building, n_City, n_CityID, n_CountryID, n_Email, n_ID, n_Name, n_Phone, n_Street, n_UserAgent){
					var params = {
						"City": City,
						"CityID": CityID,
						"CountryID": CountryID,
						"DateOfBirth": DateOfBirth,
						"Email": Email,
						"FirstName": FirstName,
						"Gender": Gender,
						"LastName": LastName,
						"MiddleName": MiddleName,
						"Password":	Password,
						"Phone": Phone,
						"UserAgent": UserAgent,
						"Latitude": Latitude,
						"Longtitude": Longtitude,
						"NewAddress": {
							"Address": n_Address,
							"Building": n_Building,
							"City": n_City,
							"CityID": n_CityID,
							"CountryID": n_CountryID,
							"Email": n_Email,
							"ID": n_ID,
							"Name": n_Name,
							"Phone": n_Phone,
							"Street": n_Street,
							"UserAgent": n_UserAgent
						}
					};
					
					//var params = 
					//var params = registration_values;
					var endpoint = '/Register/en';
					var options = {'method' : 'POST', 'endpoint' : endpoint, 'params' : params, 'return_response' : '1'};
					return http_call(options);
				},
				put_address: function(address_object){
					//address_object.Session = 'b9358d80-f738-4c0a-8125-0882be67f028';
					var params = address_object;
					var endpoint = '/AddEditAddress/en';
					var options = {'method' : 'POST', 'endpoint' : endpoint, 'params' : params, 'return_response' : '1'};
					return http_call(options);
				},
				create_shopping_cart: function(Budget, CurrencyID, RecepientAge, RecepientCity, RecepientGender, RecepientPrefernces, Occassion, CategoryIDs) {
					var params = {
						'Session' : $cookies.get('session_id'),
						//'Session' : 'b9358d80-f738-4c0a-8125-0882be67f028',
						'UserAgent':navigator.userAgent,
						'ShoppingCart':{
							"Budget":Budget,
							"CurrencyID":CurrencyID,
							"RecepientAge":RecepientAge,
							"RecepientCity":RecepientCity,
							"RecepientGender":RecepientGender,
							"RecepientPrefernces":RecepientPrefernces,
							"Occassion":Occassion,
							"CategoryIDs":CategoryIDs
						}
					};
					var endpoint = '/CreateShoppingCart/en';
					var options = {'method' : 'POST', 'endpoint' : endpoint, 'params' : params, 'return_response' : '1'};
					return http_call(options);
				},
				create_order: function(ID, Name, ShippingAddressID, BillingAddressID){
					var params = {
						//'Session' : $cookies.get('session_id'),
						'Session' : 'b9358d80-f738-4c0a-8125-0882be67f028',
						'UserAgent':navigator.userAgent,
						"ShoppingCart": {
							"ID": ID,
							"Name": "Name",
							"ShippingAddressID": ShippingAddressID,
							"BillingAddressID": BillingAddressID
						}
					};
					var endpoint = '/CreateOrder/en';
					var options = {'method' : 'POST', 'endpoint' : endpoint, 'params' : params, 'return_response' : '1'};
					return http_call(options);
				},
				get_countries: function(){
					var endpoint = '/GetCountries/en';
					var options = {'method' : 'POST', 'endpoint' : endpoint, 'return_result' : '1', 'return_response' : '1'};
					return http_call(options);
				},
				get_products: function(){
					var params = {
						per_page:100
					}
					var endpoint = '/wp/v2/product';
					var options = { 'method': 'GET', 'endpoint': endpoint, 'return_result': '1', 'return_response': '1', 'params': params};
					return http_call(options);
				},
				get_categories: function(){
					var params = {
						per_page: 100
					}
					var endpoint = '/wp/v2/product_cat';
					var options = { 'method': 'GET', 'endpoint': endpoint, 'return_result': '1', 'return_response': '1', 'params': params};
					return http_call(options);
				}
			};
		}
	]);
})();

