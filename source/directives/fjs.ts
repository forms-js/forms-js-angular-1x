/// <reference path="../../bower_components/forms-js/dist/forms-js.d.ts" />

module adaptor.directives {

  export function formsjsDirective($compile, builder) {
    var formsjsForm:formsjs.Form;

    return {
      restrict: 'AE',
      scope: {
        view: '=',
        validation: '=',
        model: '='
      },
      controller: [function() {
        formsjsForm = new formsjs.Form();
        this.registerAttribute = formsjsForm.registerAttribute.bind(formsjsForm);
      }],
      link: function(scope, element, attrs) {

        // Shallow watch on model so we catch if the instance changes.
        scope.$watch('model', function(model) {
          formsjsForm.formData = model;
        })

        scope.$watchGroup(['view','validation'], function(values) {
          var view  = values[0];
          var validation = values[1];
          if (view !== undefined && validation !== undefined) {

            formsjsForm.validationSchema = scope.validation;

            var frag = builder(view);
            element[0].appendChild(frag);
            $compile(element.children())(scope);
          }
        });

      }
    };
  }
}
