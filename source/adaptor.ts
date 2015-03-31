/// <reference path="../definitions/angularjs/angular.d.ts" />
/// <reference path="directives/checkbox.ts" />
/// <reference path="directives/form.ts" />
/// <reference path="directives/radio.ts" />
/// <reference path="directives/text.ts" />
/// <reference path="directives/view.ts" />
/// <reference path="services/builder.ts" />

module adaptor {
  angular.module('fjs', [])
    .directive('fjsCheckbox', ['$log', adaptor.directives.CheckboxDirective])
    .directive('fjsRadio', ['$log', adaptor.directives.RadioDirective])
    .directive('fjsText', ['$log', adaptor.directives.TextDirective])
    .directive('fjsForm', ['$compile', adaptor.directives.FormDirective])
    .directive('fjsView', ['$compile','fjsBuilder', adaptor.directives.ViewDirective])
    .factory('fjsBuilder', adaptor.services.builder);
}
