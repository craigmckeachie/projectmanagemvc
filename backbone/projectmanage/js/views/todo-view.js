var app = app || {};

(function ($) {
	app.TodoView = Backbone.View.extend({		
		template: _.template($("#todo-template").html()),		
		tagName: "li",
		className: "row",
		events:{
			"click .completed":"toggleCompleted",
			"click .cancel":"cancel",
			"click .todo-save":"save",
			"click .remove":"clear"
		},
		
		initialize: function(){
			_.bindAll(this,"render","editing","cancel","save","clear");	
			this.listenTo(this.model,"change",this.render);
			this.listenTo(this.model,"destroy",this.remove);
			this.listenTo(app.todos,"editing:todo",this.editing);
			
		},
		render:function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.$completed = this.$(".completed");
			this.$description = this.$(".description");
			return this;
		},
		editing:function(args){			
			if(args.id!=this.model.id){
				return;
			}
			this.$el.addClass("editing-todo");
			this.$description.focus();
		},
		cancel:function(e){			
			this.$el.removeClass("editing-todo");			
		},		
		save:function(e){
			e.preventDefault();
			this.model.set({description: this.$(".description").val()});						
			this.model.save();			
			this.$el.removeClass("editing-todo");
			this.$(".todo-list li").removeClass("editing-todo");
			app.appRouter.navigate('/todo/view');	
		},
		toggleCompleted:function(){
			this.model.toggleCompleted();
			this.model.save();
		},
		clear:function(){
			this.model.destroy();
		}
		
	});
})(jQuery);