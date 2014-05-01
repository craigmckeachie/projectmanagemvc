var app = app || {};

(function ($) {
	app.ProjectView = Backbone.View.extend({
		template: _.template($("#project-template").html()),
		tagName: "li",
		className: "row",
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
		cancel:function(e){
			e.preventDefault();
			this.$el.removeClass("editing-project");
			app.appRouter.navigate('');
		},		
		save:function(e){
			e.preventDefault();
			this.model.set({name: this.$name.val(),description: this.$description.val()});
			if (!this.model.isValid()) {
			  alert(this.model.validationError);
			  return;
			}	
			this.model.save();
			this.$el.removeClass("editing-project");
			app.appRouter.navigate('');			
			//app.appRouter.navigate('/project/view');	
		},
		clear:function(){
			this.model.destroy();
		}
	});
})(jQuery);

