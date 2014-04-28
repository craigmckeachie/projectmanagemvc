var app = app || {};

(function ($) {
	app.ProjectAddView = Backbone.View.extend({
		template: _.template($("#project-add-template").html()),
		el: "#add-project",	
		events:{			
			"click .cancel":"cancel",
			"click .project-save":"save"			
		},
		initialize: function(){
			_.bindAll(this,"render","adding","cancel","save","clearFields");	
			this.listenTo(this.model,"change",this.render);	
			this.listenTo(app.projects,"adding:project",this.adding);
			this.listenTo(app.projects,"add",this.render);			
		},
		render:function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.$add = this.$(".add");
			this.$name = this.$(".name");
			this.$description = this.$(".description");
			return this;
		},
		adding:function(){			
			this.$el.addClass("adding");
			this.$name.focus();
		},
		cancel:function(){
			this.$el.removeClass("adding");
		},
		save:function(e){
			e.preventDefault();
			var newProject = new app.Project({name: this.$name.val(),description: this.$description.val()});			
			this.collection.create(newProject, {wait:true});				
			this.$el.removeClass("adding");
			this.clearFields();
			//this.$add.focus();
			app.appRouter.navigate('');
		},
		clearFields:function(){
			this.$name.val('');
			this.$description.val('');
		}
	});
})(jQuery);
