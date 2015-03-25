module adaptor.services {


  // TODO: make a class and export it so we have a nice type
  export function builder() {
    return function(view:formsjs.ViewSchema):DocumentFragment {
      var frag = document.createDocumentFragment();

      // FIXME: This is the super simple naive version of it.
      // inputType gets translated to a a directive.
      angular.forEach(view, function(config, key) {
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
}
