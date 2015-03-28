/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />

module adaptor.directives {

  export function ViewDirective($compile, builder):ng.IDirective {
    var formsjsForm:formsjs.Form;

    return {
      restrict: 'AE',
      scope: true,

      link: function(scope:any,
                     element:ng.IAugmentedJQuery,
                     attrs:any):void {

        scope.$watch(attrs.view || attrs.fjsView, function(view) {
          if (view !== undefined) {

            var frag = builder(view);
            element[0].appendChild(frag);
            $compile(element.children())(scope);
          }
        });

      }
    };
  }
}
