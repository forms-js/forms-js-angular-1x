/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />
/// <reference path="../utils/input-helpers.ts" />

module adaptor.directives {

  export function RadioDirective($log:ng.ILogService):ng.IDirective {

    return {
      require: '^fjsForm',
      restrict: 'EA',
      templateUrl: '/templates/radio.html',

      scope: {
        fieldName: '@',
        label: '@',
        options: '='
      },

      link: function($scope:adaptor.interfaces.InputDirectiveScope,
                     $element:ng.IAugmentedJQuery,
                     $attributes:ng.IAttributes,
                     fjsFormController:any):void {

        if (!$scope.fieldName) {
          $log.error('Missing required field "fieldName"');
          return;
        }

        adaptor.utils.InputHelpers.initScope($scope, fjsFormController.form);
      }
    };
  }
}