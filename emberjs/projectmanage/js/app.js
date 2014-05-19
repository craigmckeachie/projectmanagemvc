App = Ember.Application.create();

App.ApplicationSerializer = DS.LSSerializer.extend();
App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'projectmanage-funnyant'
});

App.Project = DS.Model.extend({
  name: DS.attr( 'string' ),
  description: DS.attr( 'string' ),
  lists: DS.hasMany('list',{async:true})
});

App.List = DS.Model.extend({
  name: DS.attr( 'string' ),
  description: DS.attr( 'string' ),
  todos: DS.hasMany('todo',{async:true}),
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
  
  this.resource('projectsdetail', {path: "/projects/:project_id"},function(){
	this.route('lists.create',{path: "/lists/create"});
	this.route('todos.create',{path: "/todos/create"});
  });
  
});

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

App.ProjectsdetailRoute = Ember.Route.extend({
	isAddingList: false,
	isAddingTodo: false,
	model: function(params) {
		return this.store.find('project', params.project_id);
    },
});

App.ProjectsdetailListsCreateRoute = Ember.Route.extend({  
  activate: function(){
	this.controllerFor('projectsdetail').set('isAddingList', true);	
  },
  deactivate: function(){
	this.controllerFor('projectsdetail').set('isAddingList', false);	
  },  
});

App.ProjectsdetailListsCreateController = Ember.Controller.extend({
	needs: 'projectsdetail',
	actions: {
		save: function(){			
			var project = this.get('controllers.projectsdetail.model');
			var newList = this.store.createRecord('list', {name:this.get('newListName'), description: this.get('newListDescription'), project: project});
			newList.save();			
			
			var lists = project.get('lists');
            lists.pushObject(newList);
            project.save();
			
			this.set('newListName','');
			this.set('newListDescription','');
			this.transitionToRoute('projectsdetail');
		}
	}
});

App.ProjectsdetailTodosCreateRoute = Ember.Route.extend({    
  activate: function(){	
	this.controllerFor('projectsdetail').set('isAddingTodo', true);
  },
  deactivate: function(){	
	this.controllerFor('projectsdetail').set('isAddingTodo', false);
  }  
});


App.ListController = Ember.ObjectController.extend({
  isEditing: false,
  isDeleting: false,
  needs: "projectsdetail",  
  actions: {	
	  edit: function() {
		this.set('isEditing', true);
	  },
	  cancelEditing: function(){		
		var list = this.get('model');
		list.rollback();
		this.send("doneEditing");
	  },
	  doneEditing: function() {
		this.set('isEditing', false);
		var list = this.get('model');
		list.save();
	  },
	  remove:function(){
		this.set('isDeleting', true);
	  },
	  confirmDelete:function(){
		this.set('isDeleting', false);				
		
		/*
		var list = this.get('model');
		var project = this.get("controllers.projectsdetail.model");
		project.get('lists').removeObject(list);
		list.deleteRecord();		
		list.save();
		*/		
			
		
		var model = this.get('model');
		//project has many list clears it out
		model.eachRelationship(function(name, relationship){
		if (relationship.kind === "belongsTo") {
				var inverse = relationship.parentType.inverseFor(name);
				var parent  = model.get(name);
				if (inverse && parent) parent.get(inverse.name).removeObject(model);
			}
		});
		this.get('model').deleteRecord();
		this.get('model').save();
				
		
	  },
	  cancelDelete:function(){
		this.set('isDeleting', false);			
	  }
  }
});
