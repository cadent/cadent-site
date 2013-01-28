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
        "detail/:id"		: "detail",
        "edit"				: "edit",
        "edit/project/:id"	: "editProject"
    },
    
    initialize : function () {
        this.headerView = new CADENT.HeaderView();
        $('.content').append(this.headerView.el);
        
        this.footerView = new CADENT.FooterView();
        $('.footer').html(this.footerView.el);
        
        CADENT.projectListLoaded = false;
        CADENT.projectList = new CADENT.ProjectCollection();
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
         
		if(!CADENT.projectListLoaded) {
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
    
    contact : function () {
        console.log('ROUTER :: contact');
        this.toggleNavButton($('#nav_contact'));
        this.contactView = new CADENT.ContactView();
        $(".main-content").html(this.contactView.el);
    },
    
    
    detail : function( pid ) {
    	console.log('detail id: ' + pid);
    },
    
    edit : function() {
    	console.log('ROUTER :: edit');
        
        if (!this.adminView) {
            var proj = new CADENT.Project();
        	this.adminView = new CADENT.AdminView({model:proj});
        }
		$('.main-content').html(this.adminView.el);
        
        $('.main-content').append('<br><br>');
        
        var tagEdit = new CADENT.Tag();
        this.tagEditView = new CADENT.TagEditView({model:tagEdit});
        $('.main-content').append(this.tagEditView.el);
        
        $('.main-content').append('<br><br>');
        
       var tag = new CADENT.TagView();
        $('.main-content').append(tag.el);
        
        $('.main-content').append('<br><br>');
        
        if(!CADENT.projectListLoaded) {
			CADENT.projectList.fetch({success: function(){
	            if(!CADENT.ProjectEditListView) {
	            	CADENT.ProjectEditListView = new CADENT.ProjectEditListView({model: CADENT.projectList})
	            }
	            $(".main-content").append(CADENT.ProjectEditListView.el);
            	CADENT.projectListLoaded = true;
	        }});
		} else {
			if(!CADENT.ProjectEditListView) {
            	CADENT.ProjectEditListView = new CADENT.ProjectEditListView({model: CADENT.projectList})
            }
			$(".main-content").append(CADENT.ProjectEditListView.el);
		}
		/*
        var projectList = new CADENT.ProjectCollection();
        projectList.fetch({success: function(){
            $(".content").append(new CADENT.ProjectEditListView({model: projectList,}).el);
            CADENT.projectListLoaded = true;
        }});
        */
    },
    
    editProject: function( pid ) {
    	console.log('edit id: ' + pid);
    }
});
