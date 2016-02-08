(function(){
	'use strict';

	angular
		.module('thinkster.authentication.controllers')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$location', '$scope', 'Authentication'];

	function RegisterController($location, $scope, Authentication){
		var vm = this;

		vm.register = register;

		function register(){
			console.log("in authentication.controller, email: "+vm.email+" username: "+vm.username+" vm.password " + vm.password);
			Authentication.register(vm.email, vm.password, vm.username);
		}

		activate();

		/**
		 * @name activate
		 * @desc Actions to be performed when this controller is instantiated
		 * @memberOf thinkster.authentication.controllers.RegisterController
		 */
		function activate() {
		  // If the user is authenticated, they should not be here.
		  if (Authentication.isAuthenticated()) {
		    $location.url('/');
		  }
		}
	}
})();