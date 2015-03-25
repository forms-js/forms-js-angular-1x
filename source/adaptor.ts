/// <reference path="../definitions/angularjs/angular.d.ts" />
/// <reference path="directives/form.ts" />
/// <reference path="directives/text.ts" />

module adaptor {
  angular.module('fjs', [])
         .directive('fjsText', ['$log', adaptor.directives.TextDirective])
         .directive('fjsForm', ['$compile', adaptor.directives.FormDirective])
         .directive('fjsView', ['$compile','fjsBuilder', adaptor.directives.ViewDirective])
         .service('fjsBuilder', adaptor.services.builder);
}
