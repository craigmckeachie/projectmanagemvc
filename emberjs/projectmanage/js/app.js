var projects = [{
  id: '1',
  name: "First Project",
  description: "A description of the first project",  
}, {
  id: '2',
  name: "Second Project",
  description: "A description of the second project.",   
}];

App = Ember.Application.create();

App.Router.map(function() {
  this.resource('projects',{path: '/'},function(){	
	this.route('add',{path: '/projects/add'});
	//this.route('edit',{path: '/projects/edit/:project_id'});
    //this.route('remove',{path: '/projects/remove/:project_id'});
  });
});


App.ProjectsIndexRoute = Ember.Route.extend({
  model: function() {
    return projects;
  },     
});

App.ProjectController = Ember.ObjectController.extend({
  isEditing: false,
  actions: {	
	  edit: function() {
		this.set('isEditing', true);
	  },
	  doneEditing: function() {
		this.set('isEditing', false);
		this.get('store').commit();
	  }
  }
});

App.ProjectsAddRoute = Ember.Route.extend({  
  activate: function(){
	this.controllerFor('projects').set('addingProjectNow', true);
  },
  deactivate: function(){
	this.controllerFor('projects').set('addingProjectNow', false);
  }  
});

App.ProjectsController = Ember.Controller.extend({
	addingProjectNow : false,	
});

App.ProjectsAddController = Ember.Controller.extend({
	
});
