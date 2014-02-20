var app = app || {};

(function ($) {
		
	app.ListsView = Backbone.View.extend({
		template: _.template($("#lists-template").html()),
		el: "#content",
		initialize: function(){
			_.bindAll(this,"render","addOneList","addAllLists");
			this.$el.html(this.template(this.model.toJSON()));
			this.$listList = this.$("#lists");
			
			this.listenTo(app.lists,"reset",this.addAllLists);				
			//this.listenTo(this.model.get("lists"),"reset",this.addAllLists);							
			
			this.listenTo(app.lists,"add",this.addOneList);
			//this.listenTo(this.model.get("lists"),"add",this.addOneList);
			
			app.lists.fetch({reset:true});			
			this.render();
			
		},		
		render:function(){			
			var addListView = new app.ListAddView({model:new app.List({projectid:this.model.id,project:this.model}),collection:app.lists});
			addListView.render();			
			return this;
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
		}	
	});

})(jQuery);