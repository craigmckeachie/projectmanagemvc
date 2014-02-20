var app = app || {};

(function(){

	app.Lists = Backbone.Collection.extend({
		model: app.List,	
		localStorage: new Backbone.LocalStorage("PersistedLists"),			
	});
	
	//Create a global collection of lists	
	app.lists = new app.Lists();
	app.lists.fetch({reset:true});
})();