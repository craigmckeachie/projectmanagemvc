app.directive('focusOn', function() {
  return function(scope, elem, attr) {
    scope.$on('focusOn', function(e, name) {
      if (name === attr.focusOn) {
        elem[0].focus();
      }
    });
  };
});

app.factory('focus', function($rootScope, $timeout) {
  return function(name) {
    $timeout(function() {
      $rootScope.$broadcast('focusOn', name);
    });
  };
});


app.directive('calendar', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      $(function() {
        element.datepicker({
          dateFormat: 'mm/dd/yy',
          onSelect: function(date) {
            scope.$apply(function() {
              ngModelCtrl.$setViewValue(date);
            });
          }
        });
      });

      //ngModelCtrl.$render=function(){
      //  element.datepicker('setDate',ngModelCtrl.$viewValue || '');
      //};
    }
  };
});