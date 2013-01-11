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
        ""					: "setupApp",
        "edit"				: "edit",
        "edit/project/:id"	: "editProject"
    },
    
    setupApp: function () {
        console.log('ROUTER :: setupApp');
        
        this.headerView = new CADENT.HeaderView();
        $('.header').html(this.headerView.el);
        
        $('.content').append('<br><br>');
        
        this.footerView = new CADENT.FooterView();
        $('.footer').html(this.footerView.el);
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
        
        this.headerView = new CADENT.HeaderView();
        $('.header').html(this.headerView.el);
        
        this.footerView = new CADENT.FooterView();
        $('.footer').html(this.footerView.el);
        
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
    },
    
    editProject: function( pid ) {
    	console.log('edit id: ' + pid);
    }
});
