module adaptor.fields {
  export function text() {
    return {
      scope: true,
      restrict: 'AE',
      template: function(tElement, tAttrs) {
        return '<label>{{ cfg.label }}</label><input type="text" class="form-control" fjs-validate="KEY" ng-model="model.KEY"><div class="help-block">{{attribute.errorMessages[0]}}</div>'.replace(/KEY/g, tAttrs.key)
      },
      link: function(scope, element, attrs) {
        var key = attrs.key;
        scope.cfg = scope.view.fields[key];
      }
    };
  }
}
