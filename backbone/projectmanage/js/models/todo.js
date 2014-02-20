var app = app || {};

app.Todo = Backbone.Model.extend({
	defaults:{
		list:'',
		listid:'',
		description: '',
		completed: false
	},
	validate: function(attrs){
		//if(!this.description){
		//	return "Description is required";
		//}
		return '';
	},
	initialize:function(){
		this.on("invalid", function(model, error){
			console.log(error);
		});
	},
	toggleCompleted:function(){
		this.set('completed',!this.get('completed'));
	}
});
