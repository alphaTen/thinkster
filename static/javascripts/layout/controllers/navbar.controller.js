(function(){
	'use strict';

	angular
		.module('thinkster.layout.controllers')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$scope', 'Authentication'];

	function NavbarController( $scope, Authentication){
//		console.log("came here for NavbarController");
		var vm = this;
		vm.logout = logout;

		function logout(){
			console.log("came here for logout");
			Authentication.logout();
		}
	}
})();