app.controller('ProjectListController',function($scope, ProjectService){
	$scope.projects = ProjectService.get();	
});

app.controller('ProjectAddController',function($scope, $location, ProjectService){
	var projects = $scope.projects = ProjectService.get();
	$scope.addingProjectNow = true;
	focus('focusMeEvent');
	
	$scope.add = function(){
		var project = ProjectService.add({name:$scope.newproject.name, description:$scope.newproject.description});
		projects.push(project);
		$location.path('/');
	};
	
});

app.controller('ProjectEditController',function($scope, $location, $routeParams, ProjectService){
	var projects = $scope.projects = ProjectService.get();
	var project = ProjectService.find(parseInt($routeParams.id));		
	$scope.originalProject = angular.extend({}, project);	
	$scope.editedProject = project;	
	focus('focusMeEvent');
	
	$scope.doneEditing = function(project){
		$scope.editedProject = null;
		//trim
		if(project.name){
			project.name = project.name.trim();			 	
		}
		//delete blanks
		if(!project.name || project.name.length==0){			
			ProjectService.remove(project);
		}
		$location.path('/');
	};
	
	$scope.revertEditing = function(project){		
		projects[projects.indexOf(project)]  = $scope.originalProject;
		$scope.doneEditing(project);
		$location.path('/');
	}
	
});

app.controller('ProjectRemoveController',function($scope,$routeParams,$location, ProjectService){	
	var project = ProjectService.find(parseInt($routeParams.id));			
	ProjectService.remove(project);
	$location.path("/");
});