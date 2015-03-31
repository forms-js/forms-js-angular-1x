/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />

module adaptor.interfaces {

  export interface InputDirectiveScope extends ng.IScope {
    attributeMetadata?:formsjs.AttributeMetadata;
    bindable?:any;
    bindableOptions?:Array<any>;
    displayAttribute?:string;
    fieldName:string;
    label?:string;
    options?:Array<any>;
    valueAttribute?:string;
    watchPath?:string;
  }
}