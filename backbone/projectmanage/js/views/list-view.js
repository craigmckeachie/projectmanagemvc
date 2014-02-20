var app = app || {};

(function ($) {
	app.ListView = Backbone.View.extend({
		template: _.template($("#list-template").html()),
		tagName: "li",
		className: "row",
		events:{			
			"click .cancel":"cancel",
			"click  .list-save":"save",
			"click .remove":"clear"
		},
		initialize: function(){
			_.bindAll(this,"render","editing","cancel","save","clear","addOneTodo","addAllTodos");			
			this.listenTo(this.model,"change",this.render);
			this.listenTo(this.model,"destroy",this.remove);			
			
			this.listenTo(app.lists,"editing:list",this.editing);
									
			//this.listenTo(app.todos,"reset",this.addAllTodos);
			this.listenTo(app.todos,"add",this.addOneTodo);
		},
		render:function(){
			//if list just added and child todos added then list edited children are lost unless list initialized again
			this.model.initialize();
			this.$el.html(this.template(this.model.toJSON()));
			this.$name = this.$(".name");
			this.$description = this.$(".description");
			
			//need to send different el for each list
			$addToDoContainer = this.$('.add-todo-container');
			$addToDoContainer.html('');
			var addTodoView = new app.TodoAddView({ model:new app.Todo({list:this.model}),collection:app.todos});		
			$addToDoContainer.html(addTodoView.render().el);
			
			this.addAllTodos();
			
			return this;
		},
		addOneTodo: function(todo){
			if(this.model.get("id")!=todo.get("listid")){return;}
			var view = new app.TodoView({model:todo});
			this.$('.todo-list').append(view.render().el);
		},
		
		addAllTodos: function(){
			this.$('.todo-list').html('');
			if(!(this.model.get("todos") instanceof Array)){
				this.model.get("todos").each(this.addOneTodo,this);		
			}	
		},
		editing:function(args){			
			if(args.id!=this.model.id){
				return;
			}
			this.$el.addClass("editing-list");
			this.$name.focus();
		},
		cancel:function(){
			this.$el.removeClass("editing-list");
		},		
		save:function(e){
			e.preventDefault();
			this.model.set({name: this.$name.val(),description: this.$description.val()});						
			this.model.save();
			this.$el.removeClass("editing-list");
			this.$(".todo-list li").removeClass("editing-list");
			app.appRouter.navigate('/list/view');	
		},
		clear:function(){
			this.model.destroy();
		}
	});
})(jQuery);

