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
    
    scrollToTop: function () {
    	$('html, body').animate({
			scrollTop: 0
		}, 700);
    },
    
    home : function () {
        console.log('ROUTER :: home');
        this.toggleNavButton($('#nav_about'));
        
        this.homeView = new CADENT.HomeView();
        $(".main-content").html(this.homeView.el);
		this.scrollToTop();
// LIVE CODE - START
/*
        if(!CADENT.projectListLoaded){
			CADENT.projectList.fetch({success: function(){
	            CADENT.projectListLoaded = true;
	        }});
		}
*/
// LIVE CODE - END
    },
    
    projects : function () {
        console.log('ROUTER :: projects - loaded = ' + CADENT.projectListLoaded);
        this.displayProjects();
    },
    
    displayProjects: function () {
    	
    	var self = this;
    	this.toggleNavButton($('#nav_projects'));
    	
// TESTING CODE - START
///*
        //CADENT.projectListView = new CADENT.ProjectListView({model: CADENT.projectList});
        CADENT.projectListLoaded = true;
        this.displayProjectsAfterLoad();
        /*
        if($(".main-content").html()) {
        	$(".main-content").fadeOut('fast', function() {
	    		$(".main-content").html(CADENT.projectListView.el);
	    		$(".main-content").fadeIn();
	    		self.scrollToTop();
	    	});
        } else {
        	$(".main-content").html(CADENT.projectListView.el);
        }
        */
        
        
        
//*/    
// TESTING CODE - END
        
// LIVE CODE - START
///*        
		if(CADENT.projectListLoaded) {
			
			this.displayProjectsAfterLoad();
			/*
			CADENT.projectListView = new CADENT.ProjectListView({model: CADENT.projectList});
			
			if($(".main-content").html()) {
	        	$(".main-content").fadeOut('fast', function() {
		    		$(".main-content").html(CADENT.projectListView.el);
		    		$(".main-content").fadeIn();
		    		self.scrollToTop();
		    	});
	        } else {
	        	$(".main-content").html(CADENT.projectListView.el);
	        }
	    	
			
			if(CADENT.direct_pid) {
				CADENT.projectListView.showDetail(CADENT.direct_pid);
				CADENT.direct_pid = null;
			} else {
				this.scrollToTop();
			}
			*/
		} else {
			CADENT.projectList.fetch({success: function(){
	            CADENT.projectListLoaded = true;
	            this.displayProjectsAfterLoad();
	            /*
	            CADENT.projectListView = new CADENT.ProjectListView({model: CADENT.projectList});
	            $(".main-content").html(CADENT.projectListView.el);
	            
	            if(CADENT.direct_pid) {
					CADENT.projectListView.showDetail(CADENT.direct_pid);
					CADENT.direct_pid = null;
				} else {
					this.scrollToTop();
				}
				*/
	            
	        }});
		}
//*/
// LIVE CODE - END
    	
    },
    
    displayProjectsAfterLoad: function () {
    	var self = this;
    	CADENT.projectListView = new CADENT.ProjectListView({model: CADENT.projectList});
			
		if($(".main-content").html()) {
        	$(".main-content").fadeOut('fast', function() {
	    		$(".main-content").html(CADENT.projectListView.el);
	    		$(".main-content").fadeIn(200, function() {
	    			if(CADENT.direct_pid) {
						CADENT.projectListView.showDetail(CADENT.direct_pid);
						CADENT.direct_pid = null;
					} else {
						self.scrollToTop();
					}
				});
	    	});
        } else {
        	$(".main-content").html(CADENT.projectListView.el);
        }
    },
    
    projectDetail : function ( pid ) {
    	console.log('PID: ' + pid);
    	CADENT.direct_pid = pid;
    	this.displayProjects();
    },
    
    contact : function () {
        console.log('ROUTER :: contact');
        this.toggleNavButton($('#nav_contact'));
        this.contactView = new CADENT.ContactView();
        $(".main-content").html(this.contactView.el);
        this.scrollToTop();
    },
    
    _trackPageview: function() {
	    var url;
	    url = Backbone.history.getFragment();
	    console.log('TRACK: ' + "/" + url);
	    return _gaq.push(['_trackPageview', "/" + url]);
	  }
});
