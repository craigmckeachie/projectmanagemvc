var app = app || {};


var Todo = Backbone.Model.extend({
	defaults:{
		title: '',
		completed: false
	},
	validate: function(attrs){
		if(!title){
			return "Title is required";
		}
	},
	initialize:function(){
		this.on("invalid", function(model, error){
			console.log(error);
		});
	}
});

var todo = new Todo({title:"Buy Milk"});
console.log(todo.toJSON());

var Todos = new Backbone.Collection.extend({
	model: Todo
})

var User = Backbone.Model.extend({
	defaults:{
		firstname:'',
		lastname:''
	},
	initialize: function(){
		this.fullname= this.get("lastname")+ ", " +  this.get("firstname")
	}	
});

var craig = new User({
	firstname: 'Craig',
	lastname: 'McKeachie'
})

var john = new User({
	firstname: 'John',
	lastname: 'Doe'
})

console.log(craig.fullname);
console.log(john.fullname);

var Users = Backbone.Collection.extend({
	model: User
});

var List = Backbone.Model.extend({
    defaults: {
      name: '',
      description:'',
	  todos:[]
    },
	validate: function(attrs){	
		if(!attrs.name){
			return "Name is required.";
		}
	},
	initialize: function(){
		//app.Todos = new Todos();
		this.on("invalid",function(model,error){
			console.log(error);
		});
	},	
});


//List.prototype.validate = function(attrs){
//	return "invalid";
//};

var list = new List();

list.on("change:name",function(list){
	console.log("Changed name to: " + list.get("name"));
});

list.set("name","Craig's List")
//set name back to empty string so validation will fail
list.set("name",'',{validate:true});

list.set({id:1, name:"Craig's List"});


var Lists = Backbone.Collection.extend({
	model: List,	
	localStorage: new Backbone.LocalStorage("PersistedLists"),			
});

var lists = new Lists();
lists.add(list);

var anotherList = new List({
		id:2,
		name: 'John\'s List'
});


lists.add(anotherList);


//Call these lines in the console to see the model persisted, then
list.save();
//list.get(1);
anotherList.save();



var Project = Backbone.Model.extend({
	defaults:{
		name: '',
		description:'',
		lists:[],
		users: []
	},
	initialize:function(){
		this.lists = new Lists();
		this.users = new Users();
	}
});

var project = new Project({
	name:'Window Cleaning Management System',
	description:'National window cleaner needs management system for their operations'
});

//console.log(project.toJSON());

project.lists.fetch({reset:true});
console.log(project.lists.toJSON());

app.projects = new ProjectList();

	
/*
$(document).ready(function(){
	var AppView = Backbone.View.extend({
	  el: "#content",
	  initialize: function(){				
		this.render();
	  },
	  render:function(){
		this.$el.html("test");
	  },		
	});
	var appView = new AppView();
});
*/

var AppView = new Backbone.View.extend({
	el: "#content";
	
	initialize: function(){
		this.$projectList = $("#projects");
	},
	
	render:function(){		
		addAllProjects();
	},
	
	addOneProject(project){
		var view = new ProjectView({model:project});
		this.$projectList.append(view.render.el);
	},
	
	addAllProjects(){
		this.$projectList.html('')
		projects.each(this.addOneProject,this);		
	}	
});

//template: _.template($("#project-template").html()),
var ProjectView = new Backbone.View.extend({	
	initialize: function(){
		
	},
	render:function(){
		this.$el.append("a project");
	}
});

$(function(){
	
	
});
