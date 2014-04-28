var app = app || {};

(function ($) {
		
	app.ListsView = Backbone.View.extend({
		template: _.template($("#lists-template").html()),
		el: "#content",
		events:{"click #project-container":"editingProject",
				"click .cancel":"cancelEditingProject",
				"click .project-save":"saveProject",
				"click #remove-project":"removeProject"
				},
		initialize: function(){
			_.bindAll(this,"render","addOneList","addAllLists","editingProject","cancelEditingProject","saveProject");
			this.$el.html(this.template(this.model.toJSON()));
			this.$listList = this.$("#lists");
			//this.$name = this.$(".name");
			//this.$description = this.$(".description");
			
			this.listenTo(this.model,"change",this.initialize);			
			
			//shouldnt I fire this just for this.model.get("lists")
			this.listenTo(app.lists,"reset",this.addAllLists);			
			this.listenTo(app.lists,"add",this.addOneList);
			
			this.listenTo(this.model,"destroy",this.remove);	
			app.lists.fetch({reset:true});			
			this.render();
			
		},		
		render:function(){						
			var addListView = new app.ListAddView({model:new app.List({projectid:this.model.id,project:this.model}),collection:app.lists});
			addListView.render();			
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
			this.model.destroy();
			app.appRouter.navigate('',{ trigger: true });
			//app.appRouter.navigate('');
		},
		addOneList: function(list){						
			var foundList = this.model.get("lists").findWhere({id:list.id});
			if(!foundList){return;}
			var view = new app.ListView({model:list});
			this.$listList.append(view.render().el);
		},		
		addAllLists: function(){
			this.$listList.html('');
			//this.model.get("lists").each(this.addOneList,this);
			app.lists.each(this.addOneList,this);
		},
		close:function(){
			this.stopListening();
		}
	});

})(jQuery);