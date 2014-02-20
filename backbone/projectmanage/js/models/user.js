var app = app || {};

app.User = Backbone.Model.extend({
	defaults:{
		firstname:'',
		lastname:''
	},
	initialize: function(){
		this.fullname= this.get("lastname")+ ", " +  this.get("firstname")
	}	
});