module adaptor.directives {
  export function formsjs($compile, builder) {

    return {
      restrict: 'AE',
      scope: {
        view: '=',
        validation: '=',
        model: '='
      },
      link: function(scope, element, attrs) {
        scope.$watchGroup(['view','validation'], function(values) {
          var view  = values[0];
          var validation = values[1];
          if (view !== undefined && validation !== undefined) {
            var frag = builder(view);
            element[0].appendChild(frag);
            $compile(element.children())(scope);
          }
        });

      }
    };
  }
}
