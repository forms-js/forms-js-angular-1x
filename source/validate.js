angular.module('fjs').directive('fjsValidate', ['fjsValidator', '$q', function(fjsValidator, $q) {
  return {
    restrict: 'AE',
    scope: false,
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      scope.ngModel = ngModel;
      ngModel.$asyncValidators.fjs = function(modelValue, viewValue) {
        console.log('Going to validate ', modelValue)
        var formData = {};
        formData[attrs.fjsValidate] = modelValue;
        return fjsValidator.validateField(attrs.fjsValidate, formData, scope.validation)
                           .then(function(result) {
                             console.log('and the result is!', result);
                             scope.error = "";
                             return $q.when(true);
                           }, function(err) {
                             scope.error = err[0];
                             console.log(err);
                             return $q.reject();
                           });
      };

    }
  };
}]);
