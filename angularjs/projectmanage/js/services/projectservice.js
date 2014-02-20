app.factory('ProjectService',function(){		
	var projects = [];
	return {
		get: function(){	
			var currentProjects = angular.extend([], projects);	
			return currentProjects;
		},
		find: function (id) {
			var returnValue = null;
			projects.forEach(function(project){
				if(project.id == id){
					returnValue = project;
				}
			});
			return returnValue;
		},		
		add: function(project){
			project.id = projects.length + 1;
			projects.push(project);
			return project;
		},
		remove:function(project){
			var index = projects.indexOf(project);
			if (index >= 0) {
			  projects.splice(index, 1);
			}
			if (!projects.length) {
			  projects = [];
			}			
		}		
	};
});