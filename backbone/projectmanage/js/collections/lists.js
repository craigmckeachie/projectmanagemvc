var app = app || {};

(function(){
	//rename this to list repository
	app.Lists = Backbone.Collection.extend({
		model: app.List,	
		localStorage: new Backbone.LocalStorage("PersistedLists"),			
	});
	
	app.ProjectLists = Backbone.Collection.extend({
		model: app.List,	
		localStorage: new Backbone.LocalStorage("PersistedLists"),			
	});
	
	//Create a global collection of lists	
	app.lists = new app.Lists();
	app.lists.fetch({reset:true});
})();

/*
app.ListsAPI = Backbone.Collection.extend({
		model: app.List,	
		localStorage: new Backbone.LocalStorage("PersistedLists"),			
	});
	
	app.Lists = Backbone.Collection.extend({
		model: app.List,	
		
	});
	
*/