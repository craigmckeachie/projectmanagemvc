var app = app || {};

(function ($) {
		
	app.ProjectsView = Backbone.View.extend({
		template: _.template($("#projects-template").html()),
		el: "#content",		
		initialize: function(){
			_.bindAll(this,"render","addOneProject","addAllProjects");						
			this.$el.html(this.template());
			this.$projectsList = this.$("#projects-list");
			this.listenTo(app.projects,"reset",this.addAllProjects);			
			this.listenTo(app.projects,"add",this.addOneProject);			
			app.projects.fetch({reset:true});
			this.render();
		},
		render:function(){
			var addProjectView = new app.ProjectAddView({model:new app.Project(), collection: app.projects});
			addProjectView.render();			
			return this;
		},		
		addOneProject: function(project){
			var view = new app.ProjectView({model:project});
			this.$projectsList.append(view.render().el);
		},		
		addAllProjects: function(){
			this.$projectsList.html('')
			app.projects.each(this.addOneProject,this);		
		},	
		close:function(){
			this.stopListening();
		}	
	});
	
	app.projectsView = new app.ProjectsView();

})(jQuery);