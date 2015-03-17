module adaptor.fields {
  export function textarea() {
    return {
      scope: true,
      restrict: 'AE',
      template: function(tElement, tAttrs) {
        return '<label>{{ cfg.label }}</label><textarea class="form-control" fjs-validate="KEY" ng-model="model.KEY"></textarea><div class="help-block">{{error}}</div>'.replace(/KEY/g, tAttrs.key)
      },
      link: function(scope, element, attrs) {
        var key = attrs.key;
        scope.cfg = scope.view.fields[key];
      }
    };
  }
}
