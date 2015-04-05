/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />
/// <reference path="../interfaces/input-directive-scope.ts" />

module adaptor.utils {

  /**
   * Shared code used by various input directives.
   */
  export class InputHelpers {

    public static initScope($scope:adaptor.interfaces.InputDirectiveScope, fjsForm:formsjs.Form) {
      $scope.attributeMetadata = fjsForm.registerAttribute($scope.fieldName);
      $scope.watchPath = 'attributeMetadata.form.formData.' + $scope.fieldName;

      // TODO Determine if we need to setup bindable-to-watch-path initial binding.
      $scope.$watch($scope.watchPath, (value:any) => {
        $scope.bindable = value;
      });

      $scope.displayAttribute = $scope.displayAttribute || 'display';
      $scope.valueAttribute = $scope.valueAttribute || 'value';

      $scope.$watch('options', (options:Array<any>) => {
        var bindableOptions = [];

        if (options) {
          options.forEach((option) => {
            if (typeof option === "object") {
              bindableOptions.push(option);
            } else {
              bindableOptions.push({
                [$scope.displayAttribute]: option,
                [$scope.valueAttribute]: option
              });
            }
          });
        }

        $scope.bindableOptions = bindableOptions;
      });

      var watcherInitialized:boolean = false;

      $scope.$watch('bindable', (value:any) => {
        formsjs.Flatten.write(value, $scope.fieldName, fjsForm.formData);

        if (watcherInitialized) {
          $scope.attributeMetadata.validate().then(
            () => $scope.$digest(),
            () => $scope.$digest()
          );
        } else {
          watcherInitialized = true;
        }
      });
    }
  }
}
