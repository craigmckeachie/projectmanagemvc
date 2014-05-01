var app = app || {};

(function ($) {
		
	app.ProjectsView = Backbone.View.extend({
		template: _.template($("#projects-template").html()),
		el: "#content",		
		initialize: function(){
			_.bindAll(this,"render","addOneProject","addAllProjects");
			this.listenTo(app.projects,"reset",this.addAllProjects);			
			this.listenTo(app.projects,"add",this.addOneProject);
			this.render();
			app.projects.fetch({reset:true});
		},		
		render:function(){
			this.$el.html(this.template());
			this.$projectList = this.$("#projects");			
			
			var addProjectView = new app.ProjectAddView({model:new app.Project(),collection:app.projects});
			addProjectView.render();			
			
			return this;
		},		
		addOneProject: function(project){
			var view = new app.ProjectView({model:project});
			this.$projectList.append(view.render().el);
		},		
		addAllProjects: function(){
			this.$projectList.html('')
			app.projects.each(this.addOneProject,this);		
		}	
	});

})(jQuery);