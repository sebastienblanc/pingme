angular.module('pingme.services', [])

.factory('DataManager', function($rootScope) {
	return {
		messages : []
	}
}).factory(
		'Notification',
		function($ionicPlatform, $rootScope, DataManager) {

			function successHandler(evt) {
				console.log('SUCCESS', evt);
			}

			function errorHandler(evt) {
				console.log('ERROR', evt);
			}

			function onNotification(e) {
				console.log('NOTIFICATION', e);
				$rootScope.$apply(function() {
					DataManager.messages.push(e.payload);
				});
			}

			var pushConfig = {

				pushServerURL : "https://hackergartenups-sblanc.rhcloud.com",
				android : {
					senderID : "727736049287",
					variantID : "c1e0a6d1-2511-4b76-83f7-a3bf486c099e",
					variantSecret : "6698bd76-ff21-43be-9819-763301ecb04c"
				},
				ios : {
					variantID : "27b24076-8f60-4577-b6ee-809a4bc803f7",
					variantSecret : "b55ae9a1-76db-4d90-aa49-c573429e4a14"
				}

			};
			return {
				register : function() {
					pushConfig.alias = window.localStorage
							.getItem('phoneNumber');
					//push.register(onNotification, successHandler, errorHandler,
					//		pushConfig);
				}
			}

		});
