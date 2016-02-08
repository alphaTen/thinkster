(function(){

	angular
		.module('thinkster.layout.controllers')
		.controller('IndexController', IndexController);

	IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar'];

	function IndexController($scope, Authentication, Posts, Snackbar){
		var vm = this;

		activate();

		function activate(){
			Posts.all()
				.then(postsSuccessFn, postsErrorFn);

			$scope.$on('post.created', function(event, post){
				vm.posts.unshift(posts);
			});

			$scope.$on('post.created.error', function(){
				vm.posts.shift();
			});

			function postSuccessFn(data, status, headers, config){
				vm.posts = data.data;
			}

			function postErrorFn(data, status, headers, config){
				Snackbar.error(data.error);
			}
		}
	}
})();