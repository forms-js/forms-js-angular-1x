/// <reference path="../definitions/angularjs/angular.d.ts" />
/// <reference path="services/builder.ts" />
/// <reference path="fields/text.ts" />
/// <reference path="directives/validate.ts" />
/// <reference path="directives/fjs.ts" />

module adaptor {
  angular.module('fjs', [])
         .factory('fjsBuilder', adaptor.services.builder)
         .directive('fjsText', adaptor.fields.text)
         .directive('fjsValidate', ['$q', adaptor.directives.validate])
         .directive('formsJs',['$compile','fjsBuilder', adaptor.directives.formsjsDirective]);
}
