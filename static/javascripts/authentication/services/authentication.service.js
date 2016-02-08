(function() {
	'use strict';

angular
	.module('thinkster.authentication.services')
	.factory('Authentication', Authentication)

	Authentication.$inject = ['$cookies','$http'];

	function Authentication($cookies, $http){

		var Authentication = {
			getAuthenticatedAccount : getAuthenticatedAccount,
			isAuthenticated : isAuthenticated,
			setAuthenticatedAccount:setAuthenticatedAccount,
			unauthenticate: unauthenticate,
			login : login,
			register: register,
			logout : logout,
		};

		return Authentication;

		function register(email, password, username){
			console.log('in here authentication.services, email: '+email  + ' password: ' + password + 'username: ' + username);
			return $http.post('/api/v1/accounts/',{
				username : username,
				password : password,
				email : email
			}).then(registerSuccessFn, registerErrorFn);

			function registerSuccessFn(){
				Authentication.login(email, password);
			}

			function registerErrorFn(){
				console.log("Failure while registering");
			}
		}

		/**
		 * @name login
		 * @desc Try to log in with email `email` and password `password`
		 * @param {string} email The email entered by the user
		 * @param {string} password The password entered by the user
		 * @returns {Promise}
		 * @memberOf thinkster.authentication.services.Authentication
		 */
		function login(email, password){
			return $http.post('/api/v1/auth/login/',{
				email : email,
				password : password
			}).then(loginSuccessFn, loginErrorFn);

			/**
			   * @name loginSuccessFn
			   * @desc Set the authenticated account and redirect to index
			 */
			function loginSuccessFn(data, status, headers, config){
				Authentication.setAuthenticatedAccount(data.data);

				window.location = '/';
			}

			function loginErrorFn(data, status, headers, config){
				console.error('Failure!!!!');

			}
		}

		/**
		 * @name getAuthenticatedAccount
		 * @desc Return the currently authenticated account
		 * @returns {object|undefined} Account if authenticated, else `undefined`
		 * @memberOf thinkster.authentication.services.Authentication
		 */
		function getAuthenticatedAccount(){
			if(!$cookies.authenticatedAccount){
				return;
			}

			return JSON.parse($cookies.authenticatedAccount);
		}

		/**
		 * @name isAuthenticated
		 * @desc Check if the current user is authenticated
		 * @returns {boolean} True is user is authenticated, else false.
		 * @memberOf thinkster.authentication.services.Authentication
		 */
		function isAuthenticated(){
			return !!$cookies.authenticatedAccount;
		}

		/**
		 * @name setAuthenticatedAccount
		 * @desc Stringify the account object and store it in a cookie
		 * @param {Object} user The account object to be stored
		 * @returns {undefined}
		 * @memberOf thinkster.authentication.services.Authentication
		 */
		function setAuthenticatedAccount(account){
			$cookies.authenticatedAccount = JSON.stringify(account);
		}

		/**
		 * @name unauthenticate
		 * @desc Delete the cookie where the user object is stored
		 * @returns {undefined}
		 * @memberOf thinkster.authentication.services.Authentication
		 */
		function unauthenticate(){
			delete $cookies.authenticatedAccount;
		}

		function logout(){
			return $http.post('/api/v1/auth/logout/')
				.then(logoutSuccessFn, logoutErrorFn);

			function logoutSuccessFn(data, status, headers, config){
				Authentication.unauthenticate();
				window.location = '/' ;
			}

			function logoutErrorFn(data, status, headers, config){
				config.log("Failure while logout");
			}
		}
	}
})();