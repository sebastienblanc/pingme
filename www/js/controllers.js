angular
		.module('pingme.controllers', [ 'ngCordova' ])

		.controller(
				'ContactsIndexCtrl',
				function($scope, $cordovaContacts) {

					$scope.listContacts = function() {
						$scope.contacts = [];
						var options = {
							fields : [ 'id', 'displayName', 'phoneNumbers' ],
							multiple : true
						}
						$cordovaContacts.find(options).then(
								function(result) {
									angular.forEach(result, function(value) {
										if (value.displayName != null
												&& value.phoneNumbers != null) {
											$scope.contacts.push(value);
										}
									});
								}, function(err) {
									// Contact error
								});
					};

					$scope.listContacts();
				})
		.controller(
				'ContactSendCtrl',
				function($rootScope, $state, $scope, $stateParams, $http,
						$ionicTabsDelegate, DataManager) {
					$scope.message = {};
					$scope.message.phoneNumber = $stateParams.phoneNumber;
					$scope.send = function send(message) {
						$http(
								{
									method : 'POST',
									url : 'http://pingme-sblanc.rhcloud.com/messages',
									data : {
										message : message.message,
										to : message.phoneNumber,
										from : window.localStorage
												.getItem('phoneNumber')
									}
								}).success(
								function(data, status, headers, config) {

									DataManager.messages.push({
										content : message.message,
										to : message.phoneNumber,
										author : "Me"
									});

									//$ionicTabsDelegate.select(0);
									$state.go('tab.messages-index');

								}).error(
								function(data, status, headers, config) {

								});
					};

				})
		.controller(
				'MessagesIndexCtrl',
				function($scope, $stateParams, $ionicPlatform, $ionicPopup,
						Notification, DataManager) {

					$scope.showPopup = function() {
						$scope.data = {}

						var myPopup = $ionicPopup
								.show({
									template : '<input type="text" ng-model="data.phoneNumber">',
									title : 'Enter your phone number',
									scope : $scope,
									buttons : [
											{
												text : 'Cancel'
											},
											{
												text : '<b>Save</b>',
												type : 'button-positive',
												onTap : function(e) {
													if (!$scope.data.phoneNumber) {
														e.preventDefault();
													} else {
														window.localStorage
																.setItem(
																		"phoneNumber",
																		$scope.data.phoneNumber);
														Notification.register();
													}
												}
											}, ]
								});
					};
					$ionicPlatform
							.ready(function() {
								if (window.localStorage.getItem('phoneNumber') == null) {
									$scope.showPopup();
								}
							});
					$scope.getMessages = function() {
					  $scope.messages = DataManager.messages;
					}
					$scope.getMessages();
				});
