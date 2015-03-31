/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />

module adaptor.directives {

  export function FormDirective($compile, builder) {
    var formsjsForm:formsjs.Form;

    return {
      restrict: 'AE',

      scope: {
        validation: '=',
        model: '='
      },

      controller: function() {
        formsjsForm = new formsjs.Form();

        this.form = formsjsForm;
      },

      link: function($scope:any, $element:ng.IAugmentedJQuery, $attributes:ng.IAttributes) {
        $scope.$watch('model', function(model:any) {
          formsjsForm.formData = model;
        });

        $scope.$watch('validation', function(validation:formsjs.ValidationSchema) {
          formsjsForm.validationSchema = validation;
        });

        $element.on('submit', () => {
          formsjsForm.submitIfValid();

          return false;
        });
      }
    };
  }
}
