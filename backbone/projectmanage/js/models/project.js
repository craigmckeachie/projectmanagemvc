var app = app || {};

app.Project = Backbone.Model.extend({
	defaults:{
		name: '',
		description:'',	
		lists: []
	},
});
