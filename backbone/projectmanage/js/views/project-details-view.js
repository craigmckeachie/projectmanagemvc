var app = app || {};

(function ($) {
		
	app.ProjectDetailsView = Backbone.View.extend({
		template: _.template($("#project-details-template").html()),
		el: "#content",
		events:{"click #project-container":"editingProject",
				"click .cancel":"cancelEditingProject",
				"click #project-save":"saveProject",
				"click #remove-project":"removeProject"
				},
		initialize: function(){
			_.bindAll(this,"render","editingProject","cancelEditingProject","saveProject","removeProject","close");			
			this.listenTo(this.model,"change",this.render);
			this.listenTo(this.model,"destroy",this.close);									
		},		
		render:function(){												
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		editingProject:function(args){
			this.$el.addClass("editing-project");
			this.$(".name").focus();
		},
		cancelEditingProject:function(){
			this.$el.removeClass("editing-project");
		},		
		saveProject:function(e){
			e.preventDefault();
			this.model.set({name: this.$(".name").val(),description: this.$(".description").val()});						
			this.model.save();
			this.$el.removeClass("editing-project");
		},
		removeProject:function(event){
			event.preventDefault();
			this.model.destroy({
				success: function(){
					app.appRouter.navigate('',{ trigger: true });
				}
			});	
		},		
		close:function(){
			this.stopListening();
			$(this).empty;	
		}
	});

})(jQuery);