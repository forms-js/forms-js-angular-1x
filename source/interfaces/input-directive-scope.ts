/// <reference path="../../node_modules/forms-js/dist/forms-js.d.ts" />

module adaptor.interfaces {

  export interface InputDirectiveScope extends ng.IScope {
    attributeMetadata?:formsjs.AttributeMetadata;
    bindable?:any;
    fieldName:string;
    label?:string;
    placeholder?:string;
    watchPath?:string;
  }
}