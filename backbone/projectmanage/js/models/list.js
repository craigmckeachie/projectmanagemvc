var app = app || {};

app.List = Backbone.Model.extend({
	defaults:{
		projectid:'',
		name: '',
		description:'',	
		todos: new app.Todos()
	},
	initialize:function(){				
		this.set('todos', new app.Todos(app.todos.where({listid:this.get("id")})));
		this.get('todos', function(todo){
			todo.list = this;
			if(!todo.listid){
				todo.listid = id;
			}
		});
	},
	parse: function(data){       
		//http://stackoverflow.com/questions/14638890/backbone-model-save-returned-models-child-is-array-not-backbone-collection
        if(!this.get('todos')){
			return data;			
		}
		this.get('todos').reset(data.todos); 
		this.get('todos', function(todo){
			todo.list = this;
			if(!todo.listid){
				todo.listid = id;
			}
		});	
        delete data.todos;
        return data;
    }
});
