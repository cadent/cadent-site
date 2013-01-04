DRIVATIV = window.DRIVATIV || {};

DRIVATIV.utils = {

	/**
	* Load html, php templates ansynchronously, then fire callback
	* Presumes views[view] has been previously set as namespace.view
	* 
 	* @param {Array}	views			array of objects with loading parameters for each template:
 	* 									{
 	* 										@param {String}	name	template filename
 	* 										@param {String}	path	path to template file
 	* 										@param {String}	ext		template extension, optional - defaults to html (tested for html,php)
 	* 									}
 	* @param {Function}	callback		function called onLoadComplete
 	* @param {Object}	namespace		object used for global namespace, defaults to 'window' if not set (optional)
	*/
	loadTemplate: function(views, callback, namespace )
	{
        var deferreds = [];
        if(!namespace) namespace = window;
        
		$.each(views, function(index, view)
		{
            if (namespace[view.name]) {
                // default to html if no extension found
                if(!view.ext) view.ext = 'html';
                deferreds.push($.get(view.path + '/' + view.name + '.' + view.ext, function(data) {
                    
                    namespace[view.name].prototype.template = _.template(data);
                }));
            } else {
                alert('Could not find: ' + view.path + '/' + view.name + '.' + view.ext);
            }
        });

        $.when.apply(null, deferreds).done(callback);
    },
    
    clearForm: function( oForm )
    {
		var elements = oForm.elements; 
    
		oForm.reset();
		
		for(i=0; i<elements.length; i++)
		{
			field_type = elements[i].type.toLowerCase();
		  
			switch(field_type)
			{
				case "text": 
				case "password": 
				case "textarea":
				case "hidden":   
		      
					elements[i].value = ""; 
					break;
		        
				case "radio":
				case "checkbox":
					if (elements[i].checked)
					{
						elements[i].checked = false; 
					}
					break;
		
				case "select-one":
				case "select-multi":
					elements[i].selectedIndex = -1;
					break;
		
				default: 
					break;
			}
		}
    },
    
    reportError: function( msg ) {
    	
	}

};
