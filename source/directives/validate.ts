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
        scope.attribute = attribute;

        // We can't hook into the standard validators in angular since we like to
        // validate after the model has actually gotten updated.

        // TODO: This might need to be a standard watch instead so that it picks up changes
        //       from the outside scope.
        scope.ngModel.$viewChangeListeners.push(function() {
          console.log('Going to validate ', scope.ngModel.$modelValue)

          return attribute.validate()
                          .then(function(result) {
                            console.log('and the result is!', result);
                            scope.ngModel.$setValidity('fjs', false);
                            return $q.when(true);
                          }, function(err) {
                            console.log(err, attribute.errorMessages)
                            scope.ngModel.$setValidity('fjs', false);
                            return $q.reject();
                          });
        });

      }
    };
  }
}
