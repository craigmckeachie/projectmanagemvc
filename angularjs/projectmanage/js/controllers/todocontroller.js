
app.controller('ListController',function($scope, focus, $routeParams, dateFilter, ProjectService, ToDoService, UserService){
	
  $scope.project = ProjectService.find(parseInt($routeParams.projectid));        
  $scope.lists = ToDoService.getByProject($scope.project.id);
  $scope.users = UserService.get() || [];  
  
});

app.controller('ListAddController',function($scope, focus, $routeParams, $location, dateFilter, ProjectService, ToDoService, UserService){

  $scope.project = ProjectService.find(parseInt($routeParams.projectid));        
  $scope.lists = ToDoService.getByProject($scope.project.id);
  $scope.users = UserService.get() || [];      
  $scope.addingListNow = true;  
  focus('focusMeEvent');
  
    
  $scope.addList = function() {
    var list = ToDoService.createList($scope.project.id,$scope.newlist.name,[]);    
	list = ToDoService.add(list);
	$scope.lists.push(list);    
	$location.path('/projects/' + $scope.project.id + '/lists/');
  };
  
	
});


app.controller('ListEditController',function($scope, focus, $routeParams, $location, dateFilter, ProjectService, ToDoService, UserService){

  $scope.project = ProjectService.find(parseInt($routeParams.projectid));        
  $scope.lists = ToDoService.getByProject($scope.project.id);
  $scope.users = UserService.get() || [];  
  
  // make a copy of the original todo to restore it if the user clicks cancel.
  var list = ToDoService.find(parseInt($routeParams.id));
  $scope.originalList = angular.extend(ToDoService.createList($scope.project.id,'',[]), list);
  $scope.editedList = list;
  focus('focusListEditEvent');	
  
  $scope.doneEditingList = function(list) {
    $scope.editedList = null;
    if (list.name) {
      list.name = list.name.trim();
    }
    if (!list.name) {
      //$scope.lists.delete(list);	  
    }
	$location.path('/projects/' + $scope.project.id + '/lists/');
  };

  $scope.revertEditingList = function(list) {
    $scope.lists[$scope.lists.indexOf(list)] = $scope.originalList;
    $scope.doneEditingList($scope.originalList);
	$location.path('/projects/' + $scope.project.id + '/lists/');
  };  
	
});

app.controller('ListRemoveController',function($scope, $routeParams, $location, ToDoService ){    
  
  $scope.projectid = parseInt($routeParams.projectid);
  var list = ToDoService.find(parseInt($routeParams.id));
  ToDoService.remove(list);
  $location.path('/projects/' + $scope.projectid + '/lists/');
  
});

app.controller('TodoAddController', function($scope, focus, $routeParams, $location, dateFilter, ProjectService, ToDoService, UserService){
	
  $scope.project = ProjectService.find(parseInt($routeParams.projectid));        
  $scope.lists = ToDoService.getByProject($scope.project.id);
  $scope.list = ToDoService.find(parseInt($routeParams.listid));
  $scope.users = UserService.get() || [];  
  $scope.list.addingTodo = true;  
  //focus('focusMeEvent');
  
  $scope.add = function(list) {
    var todo = ToDoService.create(list.newtodo.description, false);
	todo = ToDoService.addTodo(list, todo);
	$scope.list.addingTodo = false;
	$scope.list.newtodo.description = '';
    $location.path('/projects/' + $scope.project.id + '/lists/');	
  };
  
  $scope.doneAdding = function(){
	$scope.list.addingTodo = false;
	$scope.list.newtodo.description = '';
	$location.path('/projects/' + $scope.project.id + '/lists/');
  };

});


app.controller('TodoEditController', function($scope, focus, $routeParams, $location, dateFilter, ProjectService, ToDoService, UserService){
	
  $scope.project = ProjectService.find(parseInt($routeParams.projectid));        
  $scope.lists = ToDoService.getByProject($scope.project.id);
  $scope.list = ToDoService.find(parseInt($routeParams.listid));
  $scope.users = UserService.get() || [];  
  
  var todo = ToDoService.findTodo(parseInt($routeParams.id));  
  // make a copy of the original todo to restore it if the user clicks cancel.
  $scope.list.originalTodo = angular.extend(ToDoService.create(), todo);
  $scope.list.editedTodo = todo;  
  //focus('focusMeEvent');
  
  
  $scope.doneEditing = function(todo, list) {
    list.editedTodo = null;
    if (todo.description) {
      todo.description = todo.description.trim();
    }
	
    if (!todo.description) {
      //$scope.delete(todo);
    }
	
	$location.path('/projects/' + $scope.project.id + '/lists/');	
  };

  $scope.revertEditing = function(todo,list) {    
	list.todos[list.todos.indexOf(todo)] = list.originalTodo;
    $scope.doneEditing(list.originalTodo,list);
  };
  
});


app.controller('TodoAssignController', function($scope, focus, $routeParams, $location, dateFilter, ProjectService, ToDoService, UserService){
	
  $scope.project = ProjectService.find(parseInt($routeParams.projectid));        
  $scope.lists = ToDoService.getByProject($scope.project.id);
  $scope.list = ToDoService.find(parseInt($routeParams.listid));
  $scope.users = UserService.get() || [];    
  var todo = ToDoService.findTodo(parseInt($routeParams.id));      
  todo.assigningTodo = true;
  
  for (var i = 0; i < $scope.list.todos.length; i++) {
   if ($scope.list.todos[i] != todo) {
	$scope.list.todos[i].assigningTodo = false;
   }
  }
  
  $scope.assign = function(todo) {
    todo.assigningTodo = false;
	$location.path('/projects/' + $scope.project.id + '/lists/');
  };
  
  $scope.hideDialogs = function($event) {
    if (angular.element($event.target).hasClass('dialog-open')) {
      return;
    }
    if (angular.element($event.target).parents().hasClass('dialog')) {
      return;
    }
	
	var lists = $scope.lists;
	for(var i=0;i<lists.length;i++){
		var todos = lists[i].todos;
		for (var i = 0; i < todos.length; i++) {
			todos[i].assigningTodo = false;
		}	
	}
    
  };
    
});


app.controller('TodoRemoveController', function($scope, $routeParams, $location, ToDoService){  
  
  $scope.projectid = parseInt($routeParams.projectid);
  ToDoService.removeTodo(parseInt($routeParams.id));  
  $location.path('/projects/' + $scope.projectid + '/lists/');	  
  
});


app.controller('ToDoController', function($scope, focus, $routeParams, dateFilter, ProjectService, ToDoService, UserService){       	
  
     
  
  
  

  

  
});

