var app = app || {};

(function ($) {
	app.TodoAddView = Backbone.View.extend({		
		template: _.template($("#todo-add-template").html()),				
		className: "row",
		events:{
			"click .add":"adding",
			"click .cancel":"cancel",
			"click .todo-save":"save",			
		},
		initialize: function(){
			_.bindAll(this,"render","adding","cancel","save","clearFields");	
			this.listenTo(this.model,"change",this.render);			
			this.listenTo(app.todos,"adding:todo",this.adding);
		},
		render:function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.$completed = this.$(".completed");
			this.$description = this.$(".description");
			return this;
		},
		adding:function(args){						
			this.$el.addClass("adding");
			this.$description.focus();
		},
		cancel:function(e){
			this.$el.removeClass("adding");			
		},		
		save:function(e){
			e.preventDefault();
			var newTodo = new app.Todo({listid:this.model.get("list").get("id"),description: this.$description.val()});
			app.todos.create(newTodo,{wait:true});			
			this.$el.removeClass("adding");
			this.clearFields();
			app.appRouter.navigate('/todo/view');	
		},
		clearFields:function(){		
			this.$description.val('');		
		}
	});
})(jQuery);