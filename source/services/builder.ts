module adaptor.services {

  export function builder() {
    return function(view) {
      var frag = document.createDocumentFragment();

      // FIXME: This is the super simple naive version of it.
      // inputType gets translated to a a directive.
      angular.forEach(view.fields, function(config, key) {
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
