// Define main namespace
CADENT = window.CADENT || {};

/**
 * GLOBAL VARIABLES
 */

CADENT.rootUrl = '';
CADENT.ApiUrl = '';
CADENT.ApiVersion = 'v1';
CADENT.activeButton = null;

// Main App
CADENT.App = Backbone.Router.extend({
    routes: {
        ""					: "home",
        "home"				: "home",
        "about"				: "home",
        "contact"			: "contact",
        "projects"			: "projects",
        "projects/:pid"		: "projectDetail"
    },
    
    initialize : function () {
        this.headerView = new CADENT.HeaderView();
        $('.content').append(this.headerView.el);
        
        this.footerView = new CADENT.FooterView();
        $('.footer').html(this.footerView.el);
        
        CADENT.projectListLoaded = false;
        CADENT.projectList = new CADENT.ProjectCollection();
        
        return this.bind('all', this._trackPageview);
    },
    
    toggleNavButton : function ( tgt ) {
    	if(CADENT.activeButton) {
    		CADENT.activeButton.removeClass('nav-inner-selected');
    	}
    	
    	CADENT.activeButton = tgt;
    	CADENT.activeButton.addClass('nav-inner-selected');
    },
    
    home : function () {
        console.log('ROUTER :: home');
        this.toggleNavButton($('#nav_about'));
        
        this.homeView = new CADENT.HomeView();
        $(".main-content").html(this.homeView.el);

// LIVE CODE - START

        if(!CADENT.projectListLoaded){
			CADENT.projectList.fetch({success: function(){
	            CADENT.projectListLoaded = true;
	        }});
		}

// LIVE CODE - END
    },
    
    projects : function () {
        console.log('ROUTER :: projects - loaded = ' + CADENT.projectListLoaded);
        this.toggleNavButton($('#nav_projects'));
        
// TESTING CODE - START
/*
        this.projectListView = new CADENT.ProjectListView({model: CADENT.projectList});
        $(".main-content").html(this.projectListView.el);
        CADENT.projectListLoaded = true;
*/        
// TESTING CODE - END
        
// LIVE CODE - START
        
		if(CADENT.projectListLoaded) {
			CADENT.homeListView = new CADENT.ProjectListView({model: CADENT.projectList});
			$(".main-content").html(CADENT.homeListView.el);
		} else {
			CADENT.projectList.fetch({success: function(){
	            CADENT.homeListView = new CADENT.ProjectListView({model: CADENT.projectList});
	            $(".main-content").html(CADENT.homeListView.el);
	            CADENT.projectListLoaded = true;
	        }});
		}

// LIVE CODE - END

    },
    
    projectDetail : function ( project_id ) {
    	console.log('PID: ' + project_id);
    },
    
    contact : function () {
        console.log('ROUTER :: contact');
        this.toggleNavButton($('#nav_contact'));
        this.contactView = new CADENT.ContactView();
        $(".main-content").html(this.contactView.el);
    },
    
    _trackPageview: function() {
	    var url;
	    url = Backbone.history.getFragment();
	    console.log('TRACK: ' + "/" + url);
	    return _gaq.push(['_trackPageview', "/" + url]);
	  }
});
