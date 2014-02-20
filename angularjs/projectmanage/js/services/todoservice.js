app.factory('ToDoService', function() {
  var self = this;   
  var lists = [];	
  
    
  function Todo(description, completed, duedate, assigneduser) {
    var self = this;
    self.description = description;
    self.completed = completed;
    self.duedate = duedate;
    self.assigneduser = assigneduser;
  }

  Todo.prototype.getStatus = function() {
    if (!this.assigneduser && !this.duedate) {
      return "unassigned";
    }
    var statusString = '';
    if (this.assigneduser) {
      statusString = this.assigneduser.name;
    }
    if (this.assigneduser && this.duedate) {
      statusString += ' - ';
    }
    if (this.duedate) {
      statusString += this.duedate;
    }
    return statusString;
  };
  
  function TodoList(projectid, name, todos){
    var self = this;
	self.projectid = projectid;
    self.name = name;
    self.description = null;
    self.todos = todos;
  }
    
  
  return {	
	get: function () {
		lists;
	},
	getByProject : function(projectid){
		var projectLists= [];
		lists.forEach(function(list){
			if(list.projectid == projectid){
				projectLists.push(list);
			}
		});
      return projectLists;
	},
	find: function (id) {
		var returnValue = null;
		lists.forEach(function(list){
			if(list.id == id){
				returnValue = list;
			}
		});
		return returnValue;
	},	
    create: function(description, completed, duedate, assigneduser) {
      return new Todo(description, completed, duedate, assigneduser);
    },	
	findTodo: function (id) {
		for(var i=0, l= lists.length;i< l;i++){
			for(var i2=0, l2= lists[i].todos.length;i2<l2;i2++){
				if(lists[i].todos[i2].id === id){
					return lists[i].todos[i2];
				}
			}
		}
		return;
	},
	addTodo: function(list,todo){
		todo.id = list.todos.length + 1;
		list.todos.push(todo);
		return todo;
	},
	removeTodo: function(id){		
		for(var i=0, l= lists.length;i < l;i++){
			for(var i2=0, l2= lists[i].todos.length;i2<l2;i2++){
					if(lists[i].todos[i2].id === id){
						var index = lists[i].todos.indexOf(lists[i].todos[i2]);
						if (index >= 0) {
						  lists[i].todos.splice(index, 1);
						  if(!list[i].todos){
							lists[i].todos = [];
						  }		
						  return;
						}
					}
			}
		}
	},
    createList: function(projectid, name, description){
      return new TodoList(projectid, name, description);
    },
	add: function(list){
		list.id = lists.length + 1;
		lists.push(list);
		return list;
	},
	remove:function(list){
		var index = lists.indexOf(list);
		if (index >= 0) {
		  lists.splice(index, 1);
		}				
	}
  };
  
});
