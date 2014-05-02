var app = app || {};

app.Project = Backbone.Model.extend({
	defaults:{
		name: '',
		description:'',	
		lists: []
	},
	initialize:function(){		
		this.on("invalid",function(model,error){
			console.log(error);			
		});		
		this.set('lists', new app.Lists(app.lists.where({projectid:this.get("id")})));
		this.get('lists', function(list){
			list.project = this;
			if(!list.projectid){
				list.projectid = id;
			}
		});
	},
	parse: function(data){       
		if(!this.get('lists')){			
			return data;			
		}
		this.get('lists').reset(data.lists); 
		this.get('lists', function(list){
			list.project = this;
			if(!list.projectid){
				list.projectid = id;
			}
		});	
        delete data.lists;
        return data;
    },
	validate: function(attrs){	
		if(!attrs.name){
			return "Project Name is required.";
		}
     },
});
