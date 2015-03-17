/// <reference path="../../bower_components/forms-js/dist/forms-js.d.ts" />

// A directive that validates via formjs.AttributeMetadata
module adaptor.directives {
  export function validate($q) {
    return {
      restrict: 'AE',
      scope: false,
      require: ['ngModel','^formsJs'],
      link: function(scope, element, attrs, controllers) {
        scope.ngModel = controllers[0];
        var formsJs = controllers[1];

        // Register the field
        var attribute:formsjs.AttributeMetadata = formsJs.registerAttribute(attrs.fjsValidate)


        // We hook into the async validators API that NgModelController exposes.
        scope.ngModel.$asyncValidators.fjs = function(modelValue, viewValue) {
          console.log('Going to validate ', modelValue, viewValue)

          var formData = {};
          formData[attrs.fjsValidate] = modelValue;
          return formsJs.validationService.validateField(attrs.fjsValidate, formData, scope.validation)
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
  }
}
