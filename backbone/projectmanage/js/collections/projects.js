var app = app || {};

app.Projects = Backbone.Collection.extend({
	model: app.Project,	
	localStorage: new Backbone.LocalStorage("PersistedProjects"),			
});

//Create a global collection of projects
app.projects = new app.Projects();
app.projects.fetch({reset:true});
