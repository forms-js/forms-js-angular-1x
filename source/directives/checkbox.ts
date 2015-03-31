/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />
/// <reference path="../utils/input-helpers.ts" />

module adaptor.directives {

  export function CheckboxDirective($log:ng.ILogService):ng.IDirective {

    return {
      require: '^fjsForm',
      restrict: 'EA',
      templateUrl: '/templates/checkbox.html',

      scope: {
        fieldName: '@',
        label: '@',
        placeholder: '@?'
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