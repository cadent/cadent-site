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
        "edit"				: "edit",
        "edit/project/:id"	: "editProject"
    },
    
    initialize: function () {
        this.headerView = new CADENT.HeaderView();
        $('.header').html(this.headerView.el);
        
        this.footerView = new CADENT.FooterView();
        $('.footer').html(this.footerView.el);
    },
    
    home: function () {
        console.log('ROUTER :: setupApp');
        
        $('.content').append('<br><br>');
		
		var projectList = new CADENT.ProjectCollection();
        projectList.fetch({success: function(){
            $(".content").append(new CADENT.ProjectListView({model: projectList,}).el);
        }});
        /*
        var proj = new CADENT.Project();
        this.adminView = new CADENT.AdminView({model:proj});
		$('.content').html(this.adminView.el);
        
        $('.content').append('<br><br>');
        
        var tagEdit = new CADENT.Tag();
        this.tagEditView = new CADENT.TagEditView({model:tagEdit});
        $('.content').append(this.tagEditView.el);
        
        $('.content').append('<br><br>');
        
       var tag = new CADENT.TagView();
        $('.content').append(tag.el);
        
        $('.content').append('<br><br>');
        
        var projectList = new CADENT.ProjectCollection();
        projectList.fetch({success: function(){
            $(".content").append(new CADENT.ProjectListView({model: projectList,}).el);
        }});
        */
    },
    
    edit: function() {
    	console.log('ROUTER :: edit');
        
        if (!this.adminView) {
            var proj = new CADENT.Project();
        	this.adminView = new CADENT.AdminView({model:proj});
        }
		$('.content').html(this.adminView.el);
        
        $('.content').append('<br><br>');
        
        var tagEdit = new CADENT.Tag();
        this.tagEditView = new CADENT.TagEditView({model:tagEdit});
        $('.content').append(this.tagEditView.el);
        
        $('.content').append('<br><br>');
        
       var tag = new CADENT.TagView();
        $('.content').append(tag.el);
        
        $('.content').append('<br><br>');
        
        var projectList = new CADENT.ProjectCollection();
        projectList.fetch({success: function(){
            $(".content").append(new CADENT.ProjectListView({model: projectList,}).el);
        }});
    },
    
    editProject: function( pid ) {
    	console.log('edit id: ' + pid);
    }
});
