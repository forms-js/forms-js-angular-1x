/// <reference path="../../bower_components/forms-js/dist/forms-js.d.ts" />

module adaptor.services {
  export function validator():formsjs.ValidationService  {
    return new formsjs.ValidationService();
  }
}
