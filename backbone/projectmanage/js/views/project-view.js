var app = app || {};

(function ($) {
	app.ProjectView = Backbone.View.extend({
		template: _.template($("#project-template").html()),
		tagName: "li",
		className: "project-card",
		events:{			
			"click .cancel":"cancel",
			"click  .project-save":"save",
			"click .remove":"clear"
		},
		initialize: function(){
			_.bindAll(this,"render","editing","cancel","save","clear");			
			this.listenTo(this.model,"change",this.render);
			this.listenTo(this.model,"destroy",this.remove);			
			this.listenTo(app.projects,"editing:project",this.editing);												
		},
		render:function(){			
			this.$el.html(this.template(this.model.toJSON()));
			this.$name = this.$(".name");
			this.$description = this.$(".description");									
			return this;
		},		
		editing:function(args){			
			if(args.id!=this.model.id){
				return;
			}
			this.$el.addClass("editing-project");
			this.$name.focus();
		},
		cancel:function(){
			this.$el.removeClass("editing-project");
		},		
		save:function(e){
			e.preventDefault();
			this.model.set({name: this.$name.val(),description: this.$description.val()});						
			this.model.save();
			this.$el.removeClass("editing-project");
			//this.$(".todo-project li").removeClass("editing-project");
			app.appRouter.navigate('/project/view');	
		},
		clear:function(){
			this.model.destroy();
		}
	});
})(jQuery);

