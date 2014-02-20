var app = app || {};

(function(){

	var Users = Backbone.Collection.extend({
	model: app.User,
	localStorage: new Backbone.LocalStorage("PersistedUsers"),
	});
	
	app.users = new Users();

})();


