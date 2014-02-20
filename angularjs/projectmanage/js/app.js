'use strict';

var app = angular.module('todoapp',[]);

app.config(function($routeProvider){
	$routeProvider	
	.when('/',{
		controller: 'ProjectListController',
		templateUrl: '/templates/projectlist.html'
	})
	.when('/projects/add',{
		controller: 'ProjectAddController',
		templateUrl: '/templates/projectlist.html'
	})
	.when('/projects/edit/:id',{
		controller: 'ProjectEditController',
		templateUrl: '/templates/projectlist.html'
	})
	.when('/projects/remove/:id',{
		controller: 'ProjectRemoveController',
		templateUrl: '/templates/projectlist.html'
	})
	.when('/projects/:projectid/lists/',{
		controller: 'ListController',
		templateUrl : '/templates/todolists.html'
	})
	.when('/projects/:projectid/lists/add',{
		controller: 'ListAddController',
		templateUrl : '/templates/todolists.html'
	})
	.when('/projects/:projectid/lists/edit/:id',{
		controller: 'ListEditController',
		templateUrl : '/templates/todolists.html'
	})
	.when('/projects/:projectid/lists/remove/:id',{
		controller: 'ListRemoveController',
		templateUrl : '/templates/todolists.html'
	})
	.when('/projects/:projectid/lists/:listid/todos/add',{
		controller: 'TodoAddController',
		templateUrl : '/templates/todolists.html'
	})
	.when('/projects/:projectid/lists/:listid/todos/edit/:id',{
		controller: 'TodoEditController',
		templateUrl : '/templates/todolists.html'
	})
	.when('/projects/:projectid/lists/:listid/todos/assign/:id',{
		controller: 'TodoAssignController',
		templateUrl : '/templates/todolists.html'
	})
	.when('/projects/:projectid/lists/:listid/todos/remove/:id',{
		controller: 'TodoRemoveController',
		templateUrl : '/templates/todolists.html'
	})
	.otherwise({
		redirectTo: '/'
	})
});




