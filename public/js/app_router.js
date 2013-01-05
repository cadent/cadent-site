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
        "": "setupApp",
        "projects": "projects"
    },
    
    setupApp: function () {
        console.log('ROUTER :: setupApp');
        
        this.headerView = new CADENT.HeaderView();
        $('.header').html(this.headerView.el);
        
        this.footerView = new CADENT.FooterView();
        $('.footer').html(this.footerView.el);
        
        var proj = new CADENT.Project();
        this.adminView = new CADENT.AdminView({model:proj});
        $('.content').html(this.adminView.el);
    },
    
    projects: function() {
    	
    }
});
