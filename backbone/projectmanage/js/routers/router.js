var app = app || {};

(function(){
	var AppRouter = Backbone.Router.extend({
	routes:{
		"":"showProjects",
		"projects":"showProjects",
		"project/add":"addingProject",		
		"project/:projectid/details":"showProjectDetails",			
	},
	showProjects:function(){
		console.log("Show Projects requested.");
		new app.ProjectsView();			
	},
	addingProject: function(){
		console.log("Add Project requested.");
		app.projects.trigger('adding:project');		
	},	
	showProjectDetails:function(projectid){
		console.log("Show Project details requested.");
		var project = app.projects.findWhere({id:projectid});								
		if(app.projectDetailsView){			
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
