var app = app || {};

(function ($) {
	app.ProjectView = Backbone.View.extend({
		template: _.template($("#project-template").html()),
		tagName: "li",
		className: "project-card",
		initialize: function(){
			_.bindAll(this,"render");			
			this.listenTo(this.model,"change",this.render);			
			this.listenTo(this.model,"destroy",this.remove);			
			//this.listenTo(this.model,"destroy",this.close);	
		},
		render:function(){			
			this.$el.html(this.template(this.model.toJSON()));
			//this.$name = this.$(".name");
			//this.$description = this.$(".description");									
			return this;
		},	
		/*
		close:function(){
			this.stopListening();
		}
*/		
	});
})(jQuery);

