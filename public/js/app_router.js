// Define main namespace
CADENT = window.CADENT || {};

/**
 * GLOBAL VARIABLES
 */

CADENT.rootUrl = '';
CADENT.ApiUrl = '';
CADENT.ApiVersion = 'v1';

// Main App
CADENT.App = Backbone.Router.extend({
    routes: {
        "/": "setupApp",
        "projects": "projects"
    },
    
    setupApp: function () {
        console.log('ROUTER :: setupApp');
        
        
    },
    
    projects: function() {
    	
    }
});
