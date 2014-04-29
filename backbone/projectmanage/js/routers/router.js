var app = app || {};

(function(){
	var AppRouter = Backbone.Router.extend({
	routes:{
		"":"showProjects",
		"projects":"showProjects",
		"project/add":"addingProject",
		"project/edit/:id":"editingProject",
		"project/:projectid/details":"showProjectDetails",			
	},
	showProjects:function(){
		console.log("Show Projects requested.");
		new app.ProjectsView();	
		//app.projectsView.render();
	},
	addingProject: function(){
		console.log("Add Project requested.");
		app.projects.trigger('adding:project');		
	},
	editingProject: function(id){
		console.log("Edit Project requested. id=" + id);
		app.projects.trigger('editing:project',{id:id});	
	},		
	showProjectDetails:function(projectid){
		console.log("Show Project details requested.");
		var project = app.projects.findWhere({id:projectid});
		//this works
		project.collection = new app.Projects();
		//this doesn't, why not?
		//because collection is projects but can be lists? 
		//project.collection = app.projects;
		
		if(app.projectDetailsView){
			//app.projectDetailsView.close();
			app.projectDetailsView.model = project;
			app.projectDetailsView.initialize();
		}else{
			app.projectDetailsView =new app.ProjectDetailsView({model:project});
		}
		
		app.projectDetailsView.render();		
	}	
});

app.appRouter = new AppRouter();
Backbone.history.start();

})()
