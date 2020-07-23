(function() {
	'use strict';
	costo_app.factory('costo_services', ['$http', '$q','$cookies',
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

				
				//Local Roy machine config
				// var domain = 'http://localhost:8888/costowoocommerce/wp-json';
				// var endpoint_url = domain + endpoint;
				// var url = endpoint_url;
				// var headers = {
				// 	'Content-Type': 'text/plain'
				// };
				// var json_params = {
				// 	consumer_key: 'ck_88ef47c27b0c4bb988a2216cc5a5924c3599c98b',
				// 	consumer_secret: 'cs_348fe0b1cd6eba0ba31ed486d18e2415654f9475'
				// 	//'format' : get_config_data('default_api_format')
				// };
				// var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } };



				// Roy Local Mac API Supermarket 
				var domain = 'http://localhost:8888/apisupermarket/wp-json';
				var json_params = {
					consumer_key:'ck_c2c56559b72b8e9ccc8eb09db2bc15be21c856a0',
					consumer_secret:'cs_50a6f66807151839d917422e63f7ae55bf588bee'
					//'format' : get_config_data('default_api_format')
				};

				// var domain = 'https://192.168.1.5/raz/discountedgrocerybackendwoocommerce/wp-json';
				// var json_params = {
				// 	consumer_key:'ck_479bfb6e3b4746b9c9874c6019f8bcc76152e510',
				// 	consumer_secret:'cs_65fec7964a8e6689d7009b8aaea9f19ff4b6d64b'
				// 	//'format' : get_config_data('default_api_format')
				// };

				// // Online https://apicosto.misco-furniture.com/
				var domain = 'https://apicosto.misco-furniture.com/wp-json';
				var json_params = {
					consumer_key:'ck_c2c56559b72b8e9ccc8eb09db2bc15be21c856a0',
					consumer_secret:'cs_50a6f66807151839d917422e63f7ae55bf588bee'
					//'format' : get_config_data('default_api_format')
				};
				var endpoint_url = domain + endpoint;
				var url = endpoint_url;
				var headers = {
					'Content-Type' : 'application/json'
				};
				var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
				//if(typeof account_token != 'undefined'){
					headers['Authorization'] = 'Basic ' + Base64.encode(json_params.consumer_key + ":" + json_params.consumer_secret);
					//headers['Authorization'] = 'Bearer bg0hAoXPM6zH7A0zGlXPOcAUFDl4Dth8';
					//headers['Authorization'] = 'Bearer ' + bearer_token;
				//}
				if(typeof params != 'undefined'){
					if(Object.keys(params).length > 0){
						angular.forEach(params, function(value, key){
						  json_params[key] = value;
						});
					}
				}
				var request_options = {
					method: method,
					url: url,
					//params: params,
					headers: headers,
					//data: params
				}
				if(request_options.method == 'GET'){
					request_options.params = params
				}else{
					request_options.data = params;
				}
				$http(request_options).then(function(response) {
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
							deferred.reject(response.data);
						}
					}
				}, function(response) {
					deferred.reject(response.status);
				});
				return deferred.promise;
			}

			return {
				get_products: function(params){
					var endpoint = '/wc/v3/products';
					//var endpoint = '/wc/v2/orders';
					params.order = 'asc';
					params.orderby = 'menu_order';
					params.status = "publish"
					// params.orderby = [{
					// 	'menu_order':'DESC',
					// }]
					var options = { 'method': 'GET', 'endpoint': endpoint, 'return_result': '1', 'return_response': '1', 'params': params};
					return http_call(options);
				},
				get_categories: function(){
					var params = {
						per_page: 100,
						orderby:'slug'
					}
					var endpoint = '/wc/v3/products/categories';
					var options = { 'method': 'GET', 'endpoint': endpoint, 'return_result': '1', 'return_response': '1', 'params': params};
					return http_call(options);
				},
				post_order: function(cart_items, guest){

					

					var endpoint = '/wc/v3/orders';
					//var endpoint = '/wc/v2/orders';
					//params.order = 'asc';
					//params.orderby = 'menu_order';

					var params= {
						// payment_method: "bacs",
						// payment_method_title: "Direct Bank Transfer",
						set_paid: true,
						billing: {
						  first_name: guest.name,
						//   last_name: "Doe",
						//   address_1: "969 Market",
						//   address_2: "",
						//   city: "San Francisco",
						//   state: "CA",
						//   postcode: "94103",
						//   country: "US",
							// email: guest.email,
						//   phone: "(555) 555-5555"
						},
						shipping: {
						  first_name: guest.name,
						//   last_name: "Doe",
						//   address_1: "969 Market",
						  address_2: guest.phone_number,
						//   city: "San Francisco",
						//   state: "CA",
						//   postcode: "94103",
						//   country: "US"
						},
						line_items: cart_items
					  }

					  if(guest.email){
						params.billing.email = guest.email
					  }

					var options = { 'method': 'POST', 'endpoint': endpoint, 'return_result': '1', 'return_response': '1', 'params': params};
					return http_call(options);
				},
				process_order: function(order_id){
					var endpoint = '/wc/v3/orders/'+order_id;
					var options = { 'method': 'PUT', 'endpoint': endpoint, 'return_result': '1', 'return_response': '1', 'params': params};
					return http_call(options);
				}
			};
		}
	]);
})();
