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
      controller: ['$scope', function($scope:ng.IScope) {
        formsjsForm = new formsjs.Form();
        this.validationService = formsjsForm.validationService;
        this.registerAttribute = formsjsForm.registerAttribute.bind(formsjsForm);
      }],
      link: function(scope, element, attrs) {
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
