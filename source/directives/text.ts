/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />

module adaptor.directives {

  export function TextDirective($log:ng.ILogService):ng.IDirective {

    return {
      require: '^fjsForm',
      restrict: 'EA',
      templateUrl: '/templates/text.html',

      scope: {
        fieldName: '@',
        label: '@',
        placeholder: '@?'
      },

      link: function($scope:any,
                     $element:ng.IAugmentedJQuery,
                     $attributes:ng.IAttributes,
                     formForController:any):void {

        if (!$scope.fieldName) {
          $log.error('Missing required field "fieldName"');
          return;
        }

        $scope.attributeMetadata = formForController.form.registerAttribute($scope.fieldName);
        $scope.watchPath = 'attributeMetadata.form.formData.' + $scope.fieldName;

        // TODO This is likely a race condition.
        // TODO Refactor this to be shared between input directives.
        $scope.$watch($scope.watchPath, function(value:any) {
          $scope.bindable = formsjs.Flatten.read($scope.fieldName, $scope.attributeMetadata.form.formData);
        });

        var initialized:boolean = false;

        $scope.$watch('bindable', (value:any) => {
          formsjs.Flatten.write(value, $scope.fieldName, $scope.attributeMetadata.form.formData);

          if (initialized) {
            $scope.attributeMetadata.validate().then(
              () => $scope.$digest(),
              () => $scope.$digest()
            );
          } else {
            initialized = true;
          }
        });
      }
    };
  }
}
