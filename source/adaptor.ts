/// <reference path="../definitions/angularjs/angular.d.ts" />
/// <reference path="services/validator.ts" />
/// <reference path="services/builder.ts" />
/// <reference path="fields/text.ts" />
/// <reference path="directives/validate.ts" />
/// <reference path="directives/fjs.ts" />

module adaptor {
  angular.module('fjs', [])
         .factory('fjsValidator', adaptor.services.validator)
         .factory('fjsBuilder', adaptor.services.builder)
         .directive('fjsText', adaptor.fields.text)
         .directive('fjsValidate', ['fjsValidator', '$q', adaptor.directives.validate])
         .directive('formsJs',['$compile','fjsBuilder', adaptor.directives.formsjs]);
}
