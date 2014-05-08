App = Ember.Application.create();

App.Router.map(function() {
  this.resource('projects',{path: ''},function(){
	this.route('add',{path: '/projects/add'});
	this.route('edit',{path: '/projects/edit/:id'});
    this.route('remove',{path: '/projects/remove/:id'});
  });
});
//multiple paths per route

App.ApplicationRoute = Ember.Route.extend({
	model: function(){
		
	}
});

App.ProjectsRoute = Ember.Route.extend({
  model: function() {
    return ['project a', 'project b', 'project c'];
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
