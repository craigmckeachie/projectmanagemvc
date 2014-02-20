app.factory('UserServiceAsAFactory', function() {
  // factory returns an object
  // you can run some code before we return anything
  //the code we run before 'return' stays stays private
  //unless we return it
  
  var users = [{
    name: 'John Doe',
    value: 1
  }, {
    name: 'Jane Doe',
    //value: 2
  }];

  return {
    get: function() {
    return users;
    }
  };
});

app.service('UserService', function UserService() {
  // service is just a constructor function
  // that will be called with 'new'
  
  var users = [{
    name: 'John Doe',
    value: 1
  }, {
    name: 'Jane Doe',
    value: 2
  }];
  //no need to new up an object
  this.get = function(){return users};
  //or return an object, this is returned
});
