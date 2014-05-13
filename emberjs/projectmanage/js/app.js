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
  this.resource('projects',{path: 'projects'},function(){	
	this.route('create');
  });
});

App.IndexRoute = Ember.Route.extend({
	redirect: function(){
		this.transitionTo('projects');
	}	
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
	  cancelEditing: function(){
		//this.set('isEditing', false);
		var project = this.get('model');
		project.rollback();
		this.send("doneEditing");
	  },
	  doneEditing: function() {
		this.set('isEditing', false);
		//this.get('store').commit();
	  }
  }
});

App.ProjectsCreateRoute = Ember.Route.extend({  
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
