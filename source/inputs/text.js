angular.module('fjs').directive('fjsText', [function() {
  return {
    scope: true,
    restrict: 'AE',
    template: function(tElement, tAttrs) {
      return '<label>{{ cfg.label }}</label>{{ngModel}}<input type="text" class="form-control" fjs-validate="KEY" ng-model="model.KEY"><div class="help-block">{{error}}</div>'.replace(/KEY/g, tAttrs.key)
    },
    link: function(scope, element, attrs) {
      var key = attrs.key;
      scope.cfg = scope.view.fields[key];
    }
  };
}]);
