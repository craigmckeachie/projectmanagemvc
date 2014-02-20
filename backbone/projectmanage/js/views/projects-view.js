var app = app || {};

(function ($) {
		
	app.ProjectsView = Backbone.View.extend({
		template: _.template($("#projects-template").html()),
		el: "#content",		
		initialize: function(){
			_.bindAll(this,"render","addOneProject","addAllProjects");			
			this.$el.html(this.template());
			this.$projectProject = this.$("#projects");			
			this.listenTo(app.projects,"reset",this.addAllProjects);			
			this.listenTo(app.projects,"add",this.addOneProject);
			
			app.projects.fetch({reset:true});				
			this.render();
			
		},
		
		render:function(){
			
			var addProjectView = new app.ProjectAddView({model:new app.Project(),collection:app.projects});
			addProjectView.render();			
			return this;
		},
		
		addOneProject: function(project){
			var view = new app.ProjectView({model:project});
			this.$projectProject.append(view.render().el);
		},
		
		addAllProjects: function(){
			this.$projectProject.html('')
			app.projects.each(this.addOneProject,this);		
		}	
	});

})(jQuery);