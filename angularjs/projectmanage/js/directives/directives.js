app.directive('autoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function(){
                _element[0].focus();
            }, 0);
        }
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