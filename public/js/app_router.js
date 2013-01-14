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
        ""					: "home",
        "home"				: "home",
        "detail/:id"		: "detail",
        "edit"				: "edit",
        "edit/project/:id"	: "editProject"
    },
    
    initialize : function () {
        this.headerView = new CADENT.HeaderView();
        $('#header').html(this.headerView.el);
        
        this.footerView = new CADENT.FooterView();
        $('.footer').html(this.footerView.el);
        
        // Adding to the CADENT namespace instead of CADENT.App because I think it is ultimately cleaner.
        CADENT.projectListLoaded = false;
        CADENT.projectList = new CADENT.ProjectCollection();
    },
    
    home : function () {
        console.log('ROUTER :: home');
        
        this.homeListView = new CADENT.ProjectListView({model: CADENT.projectList});
        $(".main-content").append(this.homeListView.el);
        CADENT.projectListLoaded = true;
		 /*          
        if(this.homeListView)
        {
        	$(".main-content").append(this.homeListView.el);
        } else {
			if(!CADENT.projectListLoaded){
				CADENT.projectList.fetch({success: function(){
	            
		            this.homeListView = new CADENT.ProjectListView({model: CADENT.projectList,});
		            $(".main-content").append(this.homeListView.el);
		            CADENT.projectListLoaded = true;
		        }});
			} else {
				$(".main-content").append(this.homeListView.el);
			}
		}
		*/
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
