var app = app || {};

(function(){	
	app.Todos = Backbone.Collection.extend({
		model: app.Todo,
		localStorage: new Backbone.LocalStorage("PersistedTodos"),
	});	
	
	app.todos = new app.Todos();
	app.todos.fetch({reset:true});	
})();


