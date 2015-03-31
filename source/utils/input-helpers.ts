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

      $scope.$watch($scope.watchPath, (value:any) => {
        $scope.bindable = formsjs.Flatten.read($scope.fieldName, fjsForm.formData);
      });

      // TODO Determine if we need to setup bindable-to-watch-path initial binding.

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