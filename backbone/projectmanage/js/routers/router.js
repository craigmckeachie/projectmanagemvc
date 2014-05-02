var app = app || {};

(function(){
	var AppRouter = Backbone.Router.extend({
	routes:{
		"":"showProjects",
		"projects":"showProjects",
		"project/add":"addingProject",
		"project/edit/:id":"editingProject",
		"project/:projectid/lists":"showLists",	
		"project/:projectid/list/add":"addingList",
		"project/:projectid/list/edit/:id":"editingList",		
		"todo/edit/:id":"editingTodo"
	},
	showProjects:function(){
		console.log("Show Projects requested.");
		projectsView = new app.ProjectsView();
	},
	addingProject: function(){
		console.log("Add Project requested.");		
		app.projects.trigger('adding:project');
	},
	editingProject: function(id){
		console.log("Edit Project requested. id=" + id);
		app.projects.trigger('editing:project',{id:id});	
	},
	showLists:function(projectid){
		console.log("Show Lists requested.");
		var project = app.projects.findWhere({id:projectid});
		listsView =new app.ListsView({model:project});		
	},	
	addingList: function(){
		console.log("Add List requested.");		
		app.lists.trigger('adding:list');
	},
	addingList: function(projectid){
		console.log("Add List requested.");		
		app.lists.trigger('adding:list',{projectid:projectid});
	},
	editingList: function(projectid,id){
		console.log("Edit List requested. id=" + id);
		app.lists.trigger('editing:list',{projectid: projectid,id:id});	
	},
	editingTodo: function(id){
		console.log("Edit todo requested. id=" + id);
		app.todos.trigger('editing:todo',{id:id});	
	}	
});

app.appRouter = new AppRouter();
Backbone.history.start();

})()
