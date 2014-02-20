var app = app || {};

(function ($) {
	app.ListAddView = Backbone.View.extend({
		template: _.template($("#list-add-template").html()),
		el: "#add-list",	
		events:{			
			"click .cancel":"cancel",
			"click .list-save":"save"			
		},
		initialize: function(){
			_.bindAll(this,"render","adding","cancel","save","clearFields");	
			this.listenTo(this.model,"change",this.render);	
			this.listenTo(app.lists,"adding:list",this.adding);			
		},
		render:function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.$add = this.$(".add");
			this.$name = this.$(".name");
			this.$description = this.$(".description");
			return this;
		},
		adding:function(args){
			this.model.set("projectid",args.projectid);
			this.$el.addClass("adding");
			this.$name.focus();
		},
		cancel:function(){
			this.$el.removeClass("adding");
		},
		save:function(e){
			e.preventDefault();
			var newList = new app.List({projectid:this.model.get("projectid"), name: this.$name.val(),description: this.$description.val()});			
			this.collection.create(newList, {wait:true});				
			this.$el.removeClass("adding");
			this.clearFields();
			this.$add.focus();
			app.appRouter.navigate('project/' + this.model.get("projectid") + '/lists/view');
		},
		clearFields:function(){
			this.$name.val('');
			this.$description.val('');
		}
	});
})(jQuery);
