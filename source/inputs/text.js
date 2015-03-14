angular.module('fjs').directive('fjsText', [function() {
  return {
    scope: true,
    restrict: 'AE',
    template: function(tElement, tAttrs) {
      return '<label>{{ cfg.label }}</label><input type="text" class="form-control" ng-model="model.MODEL">'.replace('MODEL', tAttrs.key)
    },
    link: function(scope, element, attrs) {
      var key = attrs.key;
      scope.cfg = scope.view.fields[key];
    }
  };
}]);
