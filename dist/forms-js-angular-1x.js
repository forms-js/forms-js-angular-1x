(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.adaptor = factory();
  }
}(this, function() {
var adaptor;
(function (adaptor) {
    var services;
    (function (services) {
        function builder() {
            return function (view) {
                var frag = document.createDocumentFragment();
                // FIXME: This is the super simple naive version of it.
                // inputType gets translated to a a directive.
                angular.forEach(view.fields, function (config, key) {
                    // FIXME: error handling if inputType is missing.
                    var elem = document.createElement('div');
                    elem.setAttribute('fjs-' + config.inputType, '');
                    elem.setAttribute('key', key);
                    // FIXME: support for complex keys
                    elem.setAttribute('config', "view['" + key + '"]');
                    elem.className = 'form-group';
                    frag.appendChild(elem);
                });
                return frag;
            };
        }
        services.builder = builder;
    })(services = adaptor.services || (adaptor.services = {}));
})(adaptor || (adaptor = {}));
/*
    // Basic stab at building a view
    {
  options: {
      fieldLayout:    vertical / horizontal / inline   (default=?)
                  // Other stuff that might go here - things in ng-options (for angular thinkers)
  },

  fields : {							// attributes is optional.  If there are no attributes then all attributes from the data schema are used
      // A list of attributes in this view
      “attribute1” : {},
      “attribute2” : {},..

      // Which can override parts of the corresponding attribute in the data schema (but not type)
      “/attribute3/street-name/0/”: {

          inputType:”stepper”,
              help=”This help is only used in this form”,
    label: 					// defaults to title case of attribute name
    placeHolder:                                      // in relevant input controls
    help:   					// Help text.  Could have multiple types - default / inline / popup
    readonly:

    hide: function() { }			// A function that determines whether this field should be hidden
              constraints: {
              max: {value: 50, message: ‘Value for %s can’t go above 50 on this form’}
          }
      },
      {
          key: “dateAttribute”,
          inputType : ‘plugin’,
          plugin: ‘FancyDatePickerWidget’     // a plugin may not be supported in all adaptors
      },
      {
          key: ‘arrayAttribute’,
    options: {
          // some options only apply to attributes of type Array
  // Likely that not all options will be supported by all adaptors
allowAdd :           	// can new elements be added? (default true)
allowRemove:		// can elements be removed? (default true)
allowOrder:		// is the array orderable?  (default false)
fieldLayout : grid     	// default to whatever is being used for the containing form, but grid is only an option for arrays
}
}
      …

      // Attributes can be contained in layout elements, such as fieldsets.  These layout elements are rendered by the adaptors
      {
          layoutElement: ‘fieldset’,
          title: ‘My Group of Fields’,
          fields: [
              // A list of attributes in the layout element
          ]
      },

      // or tabs
      {
          layoutElement: ‘tabs’,
          tabs: [
              {
                      title: “A tab title”,
                  fields : [
                          // list of attributes on this tab
                  ]
                  },
              {
                      title: “Another tab”,
                  fields : [
                          // list of attributes on this tab
                  ]
                  }
          ]
      },


  ],
  constraints : [
      // Additional or overriding form / multi-field constraints that apply only to this form
  ]
}

*/
var adaptor;
(function (adaptor) {
    var fields;
    (function (fields) {
        function text() {
            return {
                scope: true,
                restrict: 'AE',
                template: function (tElement, tAttrs) {
                    return '<label>{{ cfg.label }}</label><input type="text" class="form-control" fjs-validate="KEY" ng-model="model.KEY"><div class="help-block">{{error}}</div>'.replace(/KEY/g, tAttrs.key);
                },
                link: function (scope, element, attrs) {
                    var key = attrs.key;
                    scope.cfg = scope.view.fields[key];
                }
            };
        }
        fields.text = text;
    })(fields = adaptor.fields || (adaptor.fields = {}));
})(adaptor || (adaptor = {}));
var adaptor;
(function (adaptor) {
    var fields;
    (function (fields) {
        function textarea() {
            return {
                scope: true,
                restrict: 'AE',
                template: function (tElement, tAttrs) {
                    return '<label>{{ cfg.label }}</label><textarea class="form-control" fjs-validate="KEY" ng-model="model.KEY"></textarea><div class="help-block">{{error}}</div>'.replace(/KEY/g, tAttrs.key);
                },
                link: function (scope, element, attrs) {
                    var key = attrs.key;
                    scope.cfg = scope.view.fields[key];
                }
            };
        }
        fields.textarea = textarea;
    })(fields = adaptor.fields || (adaptor.fields = {}));
})(adaptor || (adaptor = {}));
/// <reference path="../../bower_components/forms-js/dist/forms-js.d.ts" />
// A directive that validates via formjs.AttributeMetadata
var adaptor;
(function (adaptor) {
    var directives;
    (function (directives) {
        function validate($q) {
            return {
                restrict: 'AE',
                scope: false,
                require: ['ngModel', '^formsJs'],
                link: function (scope, element, attrs, controllers) {
                    scope.ngModel = controllers[0];
                    var formsJs = controllers[1];
                    // Register the field
                    var attribute = formsJs.registerAttribute(attrs.fjsValidate);
                    // We hook into the async validators API that NgModelController exposes.
                    scope.ngModel.$asyncValidators.fjs = function (modelValue, viewValue) {
                        console.log('Going to validate ', modelValue, viewValue);
                        var formData = {};
                        formData[attrs.fjsValidate] = modelValue;
                        return formsJs.validationService.validateField(attrs.fjsValidate, formData, scope.validation).then(function (result) {
                            console.log('and the result is!', result);
                            scope.error = "";
                            return $q.when(true);
                        }, function (err) {
                            scope.error = err[0];
                            console.log(err);
                            return $q.reject();
                        });
                    };
                }
            };
        }
        directives.validate = validate;
    })(directives = adaptor.directives || (adaptor.directives = {}));
})(adaptor || (adaptor = {}));
/// <reference path="../../bower_components/forms-js/dist/forms-js.d.ts" />
var adaptor;
(function (adaptor) {
    var directives;
    (function (directives) {
        function formsjsDirective($compile, builder) {
            var formsjsForm;
            return {
                restrict: 'AE',
                scope: {
                    view: '=',
                    validation: '=',
                    model: '='
                },
                controller: ['$scope', function ($scope) {
                    formsjsForm = new formsjs.Form();
                    this.validationService = formsjsForm.validationService;
                    this.registerAttribute = formsjsForm.registerAttribute.bind(formsjsForm);
                }],
                link: function (scope, element, attrs) {
                    scope.$watchGroup(['view', 'validation'], function (values) {
                        var view = values[0];
                        var validation = values[1];
                        if (view !== undefined && validation !== undefined) {
                            formsjsForm.validationSchema = scope.validation;
                            var frag = builder(view);
                            element[0].appendChild(frag);
                            $compile(element.children())(scope);
                        }
                    });
                }
            };
        }
        directives.formsjsDirective = formsjsDirective;
    })(directives = adaptor.directives || (adaptor.directives = {}));
})(adaptor || (adaptor = {}));
/// <reference path="../definitions/angularjs/angular.d.ts" />
/// <reference path="services/builder.ts" />
/// <reference path="fields/text.ts" />
/// <reference path="fields/textarea.ts" />
/// <reference path="directives/validate.ts" />
/// <reference path="directives/fjs.ts" />
var adaptor;
(function (adaptor) {
    angular.module('fjs', []).factory('fjsBuilder', adaptor.services.builder).directive('fjsText', adaptor.fields.text).directive('fjsTextarea', adaptor.fields.textarea).directive('fjsValidate', ['$q', adaptor.directives.validate]).directive('formsJs', ['$compile', 'fjsBuilder', adaptor.directives.formsjsDirective]);
})(adaptor || (adaptor = {}));

return adaptor;
}));
