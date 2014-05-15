App = Ember.Application.create();

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'projectmanage-funnyant'
});

App.Project = DS.Model.extend({
  name: DS.attr( 'string' ),
  description: DS.attr( 'string' ),
  lists: DS.hasMany('list')
});

App.List = DS.Model.extend({
  name: DS.attr( 'string' ),
  description: DS.attr( 'string' ),
  todos: DS.hasMany('todo'),
  project: DS.belongsTo('project')
});

App.Todo = DS.Model.extend({  
  description: DS.attr( 'string' ),
  duedate: DS.attr( 'date' ),
  assigneduser: DS.attr( 'string' ),
  list: DS.belongsTo('list')
});

App.Router.map(function() {
  this.resource('projects', function(){	
	this.route('create');	
  });
  
  this.resource('projects.detail', {path: "/projects/:project_id"},function(){
	this.route('lists.create',{path: "/lists/create"});
	this.route('todos.create',{path: "/todos/create"});
  });
  
});

App.ProjectDetailsRoute = Ember.Route.extend({
	
});

/*
App.ListsCreateRoute = Ember.Route.extend({
	
});
*/

App.IndexRoute = Ember.Route.extend({
	redirect: function(){
		this.transitionTo('projects');
	}	
});

App.ProjectsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('project');
  },     
});

App.ProjectsController = Ember.ArrayController.extend({
	isAdding: false,
});

App.ProjectController = Ember.ObjectController.extend({
  isEditing: false,
  isDeleting: false,
  actions: {	
	  edit: function() {
		this.set('isEditing', true);
	  },
	  cancelEditing: function(){		
		var project = this.get('model');
		project.rollback();
		this.send("doneEditing");
	  },
	  doneEditing: function() {
		this.set('isEditing', false);
		var project = this.get('model');
		project.save();		
	  },
	  remove:function(){
		this.set('isDeleting', true);
	  },
	  confirmDelete:function(){
		this.set('isDeleting', false);
		var project = this.get('model');
		project.deleteRecord();
		project.save();	
	  },
	  cancelDelete:function(){
		this.set('isDeleting', false);			
	  }
  }
});


App.ProjectsCreateRoute = Ember.Route.extend({    
  activate: function(){
	this.controllerFor('projects').set('isAdding', true);
  },
  deactivate: function(){
	this.controllerFor('projects').set('isAdding', false);
  }  
});

App.ProjectsCreateController = Ember.Controller.extend({
	actions: {
		save: function(){
			var newProject = this.store.createRecord('project', {name:this.get('newName'), description: this.get('newDescription')});			
			newProject.save();
			
			this.set('newName','');
			this.set('newDescription','');
			this.transitionToRoute('projects');
		}
	}
});