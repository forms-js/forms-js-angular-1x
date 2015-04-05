(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.adaptor = factory();
  }
}(this, function() {
/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />
/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />
/// <reference path="../interfaces/input-directive-scope.ts" />
var adaptor;
(function (adaptor) {
    var utils;
    (function (utils) {
        /**
         * Shared code used by various input directives.
         */
        var InputHelpers = (function () {
            function InputHelpers() {
            }
            InputHelpers.initScope = function ($scope, fjsForm) {
                $scope.attributeMetadata = fjsForm.registerAttribute($scope.fieldName);
                $scope.watchPath = 'attributeMetadata.form.formData.' + $scope.fieldName;
                // TODO Determine if we need to setup bindable-to-watch-path initial binding.
                $scope.$watch($scope.watchPath, function (value) {
                    $scope.bindable = value;
                });
                $scope.displayAttribute = $scope.displayAttribute || 'display';
                $scope.valueAttribute = $scope.valueAttribute || 'value';
                $scope.$watch('options', function (options) {
                    var bindableOptions = [];
                    if (options) {
                        options.forEach(function (option) {
                            if (typeof option === "object") {
                                bindableOptions.push(option);
                            }
                            else {
                                var bindableOption = {};
                                bindableOption[$scope.displayAttribute] = option;
                                bindableOption[$scope.valueAttribute] = option;
                                bindableOptions.push(bindableOption);
                            }
                        });
                    }
                    $scope.bindableOptions = bindableOptions;
                });
                var watcherInitialized = false;
                $scope.$watch('bindable', function (value) {
                    formsjs.Flatten.write(value, $scope.fieldName, fjsForm.formData);
                    if (watcherInitialized) {
                        $scope.attributeMetadata.validate().then(function () { return $scope.$digest(); }, function () { return $scope.$digest(); });
                    }
                    else {
                        watcherInitialized = true;
                    }
                });
            };
            return InputHelpers;
        })();
        utils.InputHelpers = InputHelpers;
    })(utils = adaptor.utils || (adaptor.utils = {}));
})(adaptor || (adaptor = {}));
/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />
/// <reference path="../utils/input-helpers.ts" />
var adaptor;
(function (adaptor) {
    var directives;
    (function (directives) {
        function CheckboxDirective($log) {
            return {
                require: '^fjsForm',
                restrict: 'EA',
                templateUrl: '/templates/checkbox.html',
                scope: {
                    disabled: '@?',
                    fieldName: '@',
                    label: '@'
                },
                link: function ($scope, $element, $attributes, fjsFormController) {
                    if (!$scope.fieldName) {
                        $log.error('Missing required field "fieldName"');
                        return;
                    }
                    adaptor.utils.InputHelpers.initScope($scope, fjsFormController.form);
                }
            };
        }
        directives.CheckboxDirective = CheckboxDirective;
    })(directives = adaptor.directives || (adaptor.directives = {}));
})(adaptor || (adaptor = {}));
/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />
var adaptor;
(function (adaptor) {
    var directives;
    (function (directives) {
        function FormDirective($compile, builder) {
            var formsjsForm;
            return {
                restrict: 'AE',
                scope: {
                    validation: '=',
                    model: '='
                },
                controller: function () {
                    formsjsForm = new formsjs.Form();
                    this.form = formsjsForm;
                },
                link: function ($scope, $element, $attributes) {
                    $scope.$watch('model', function (model) {
                        formsjsForm.formData = model;
                    });
                    $scope.$watch('validation', function (validation) {
                        formsjsForm.validationSchema = validation;
                    });
                    $element.on('submit', function () {
                        formsjsForm.submitIfValid();
                        return false;
                    });
                }
            };
        }
        directives.FormDirective = FormDirective;
    })(directives = adaptor.directives || (adaptor.directives = {}));
})(adaptor || (adaptor = {}));
/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />
/// <reference path="../utils/input-helpers.ts" />
var adaptor;
(function (adaptor) {
    var directives;
    (function (directives) {
        function RadioDirective($log) {
            return {
                require: '^fjsForm',
                restrict: 'EA',
                templateUrl: '/templates/radio.html',
                scope: {
                    disabled: '@?',
                    fieldName: '@',
                    label: '@',
                    options: '='
                },
                link: function ($scope, $element, $attributes, fjsFormController) {
                    if (!$scope.fieldName) {
                        $log.error('Missing required field "fieldName"');
                        return;
                    }
                    adaptor.utils.InputHelpers.initScope($scope, fjsFormController.form);
                }
            };
        }
        directives.RadioDirective = RadioDirective;
    })(directives = adaptor.directives || (adaptor.directives = {}));
})(adaptor || (adaptor = {}));
/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />
/// <reference path="../utils/input-helpers.ts" />
var adaptor;
(function (adaptor) {
    var directives;
    (function (directives) {
        function TextDirective($log) {
            return {
                require: '^fjsForm',
                restrict: 'EA',
                templateUrl: '/templates/text.html',
                scope: {
                    disabled: '@?',
                    fieldName: '@',
                    label: '@',
                    placeholder: '@?'
                },
                link: function ($scope, $element, $attributes, fjsFormController) {
                    if (!$scope.fieldName) {
                        $log.error('Missing required field "fieldName"');
                        return;
                    }
                    adaptor.utils.InputHelpers.initScope($scope, fjsFormController.form);
                }
            };
        }
        directives.TextDirective = TextDirective;
    })(directives = adaptor.directives || (adaptor.directives = {}));
})(adaptor || (adaptor = {}));
/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />
var adaptor;
(function (adaptor) {
    var directives;
    (function (directives) {
        function ViewDirective($compile, builder) {
            var formsjsForm;
            return {
                restrict: 'AE',
                scope: true,
                link: function (scope, element, attrs) {
                    scope.$watch(attrs.view || attrs.fjsView, function (view) {
                        if (view !== undefined) {
                            var frag = builder(view);
                            element[0].appendChild(frag);
                            $compile(element.children())(scope);
                        }
                    });
                }
            };
        }
        directives.ViewDirective = ViewDirective;
    })(directives = adaptor.directives || (adaptor.directives = {}));
})(adaptor || (adaptor = {}));
var adaptor;
(function (adaptor) {
    var services;
    (function (services) {
        // TODO: make a class and export it so we have a nice type
        function builder() {
            return function (view) {
                var frag = document.createDocumentFragment();
                // FIXME: This is the super simple naive version of it.
                // inputType gets translated to a a directive.
                angular.forEach(view, function (config, key) {
                    // FIXME: error handling if inputType is missing.
                    var elem = document.createElement('div');
                    elem.setAttribute('fjs-' + config.inputType, '');
                    elem.setAttribute('field-name', key);
                    // The rest of the view config is added as attributes.
                    angular.forEach(config, function (value, name) {
                        switch (name) {
                            case 'options':
                                elem.setAttribute(name, JSON.stringify(value));
                                break;
                            default:
                                elem.setAttribute(name, value);
                                break;
                        }
                    });
                    elem.className = 'form-group';
                    frag.appendChild(elem);
                });
                return frag;
            };
        }
        services.builder = builder;
    })(services = adaptor.services || (adaptor.services = {}));
})(adaptor || (adaptor = {}));
/// <reference path="../definitions/angularjs/angular.d.ts" />
/// <reference path="directives/checkbox.ts" />
/// <reference path="directives/form.ts" />
/// <reference path="directives/radio.ts" />
/// <reference path="directives/text.ts" />
/// <reference path="directives/view.ts" />
/// <reference path="services/builder.ts" />
var adaptor;
(function (adaptor) {
    angular.module('fjs', []).directive('fjsCheckbox', ['$log', adaptor.directives.CheckboxDirective]).directive('fjsRadio', ['$log', adaptor.directives.RadioDirective]).directive('fjsText', ['$log', adaptor.directives.TextDirective]).directive('fjsForm', ['$compile', adaptor.directives.FormDirective]).directive('fjsView', ['$compile', 'fjsBuilder', adaptor.directives.ViewDirective]).factory('fjsBuilder', adaptor.services.builder);
})(adaptor || (adaptor = {}));

return adaptor;
}));
