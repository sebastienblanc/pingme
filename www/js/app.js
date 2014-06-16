angular.module('pingme', [ 'ionic', 'pingme.services', 'pingme.controllers' ])

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
	.state('tab', {
		url : "/tab",
		abstract : true,
		templateUrl : "templates/tabs.html"
	})

	.state('tab.contacts-index', {
		url : '/contacts',
		views : {
			'contacts-tab' : {
				templateUrl : 'templates/contacts-index.html',
				controller : 'ContactsIndexCtrl'
			}
		}
	}).state('tab.contact-detail', {
		url : '/contact/:phoneNumber',
		views : {
			'contacts-tab' : {
				templateUrl : 'templates/contact-detail.html',
				controller : 'ContactSendCtrl'
			}
		}
	})

	.state('tab.messages-index', {
		url : '/messages',
		views : {
			'messages-tab' : {
				templateUrl : 'templates/messages-index.html',
				controller : 'MessagesIndexCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/messages');

});
