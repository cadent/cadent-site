CADENT = window.CADENT || {};
CADENT.activeProject = null;

CADENT.ProjectListView = Backbone.View.extend({

	initialize: function () {
	    this.render();
	},

	render: function () {
		var projects = this.model.models;
        var len = 10;
		//var len = projects.length;
		
		$(this.el).html('<div class="project-thumbnails"></div>');

		
        for (var i = 0; i < len; i++) {
            $('.project-thumbnails', this.el).append(new CADENT.ProjectListItemView({model: new CADENT.Project()}).render().el);
            //$('.thumbnails', this.el).append(new CADENT.ProjectListItemView({model: projects[i]}).render().el);
        }

        return this;
    }
});

CADENT.ProjectImgThumbView = Backbone.View.extend({

    tagName: 'div',
    className: 'project-thumb-img',
    
    events: {
		'click': 'selectImg'
	},
	
    initialize: function () {
        this.render();
    },

    render: function () {
        if(this.model.get('selected')) {
        	$(this.el).html('<img src="' + this.model.get('thumb_url') + '">');
        	$(this.el).addClass('thumb-selected');
        } else {
        	$(this.el).html('<img src="' + this.model.get('thumb_url') + '">');
        }
        
        return this;
    },
    
    selectImg: function() {
    	var f = this.model.get('selectCallback');
    	if(f != null) {
    		f(this);
    		$(this.el).addClass('thumb-selected');
    	}
    },
    
    deselectImg: function() {
    	$(this.el).removeClass('thumb-selected');
    }

});

CADENT.ProjectListItemView = Backbone.View.extend({

    tagName: 'div',
    className: 'project-thumbnail project-thumbnail-minimized',
    selectedThumb: null,
	
	events: {
		'click .project-hero-img > img'	: 'expandView'
	},
	
    initialize: function () {
        //this.model.bind("change", this.render, this);
        //this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        //console.log('imgs: ' + this.model.get('imgs'));
        
    	
    	var images = this.model.get('imgs');
    	if(images)
    	{
    		var len = images.length;
    		
    		var p_img = $(this.el).children('.project-hero-img');
        	var img_list = p_img.children('.project-thumbnail-list');
        	var m;
        	
	    	for (var i = 0; i < len; i++) {
				if(i == 0) {
					m = new CADENT.ThumbImg({thumb_url: 'img/thumbnails/' + images[i], img_url: 'img/projects/' + images[i], selected:true, selectCallback:this.selectImg});
				} else {
					m = new CADENT.ThumbImg({thumb_url: 'img/thumbnails/' + images[i], img_url: 'img/projects/' + images[i], selected:false, selectCallback:this.selectImg});
				}
				
				var v = new CADENT.ProjectImgThumbView({model:m});
				if(i == 0) this.selectedThumb = v;
				img_list.append(v.el);
	        }
    	}
    	
        return this;
    },
    
    selectImg: function( imgView ) {
    	if(this.selectedThumb){
    		this.selectedThumb.deselectImg();
    	}
    	this.selectedThumb = imgView;
    	$(this.el).children('.project-hero-img img').attr('src', this.selectedThumb.model.get('img_url'));
    	//console.log('select: ' + imgView);
    },
    
    expandView: function() {
    	var last_project = null;
    	
    	if(CADENT.activeProject) {
    		last_project = CADENT.activeProject;
    		//CADENT.activeProject.collapseView();
    	}
    	
    	CADENT.activeProject = this;
    	$(this.el).removeClass('project-thumbnail-minimized').addClass('project-thumbnail-expanded');
    	
    	var p_img = $(this.el).children('.project-hero-img');
    	p_img.removeClass('project-hero-img-collapsed').addClass('project-hero-img-expanded');
    	
    	p_img.children('.project-thumbnail-list').fadeIn('slow', function() {
    			if(last_project) last_project.collapseView();
    		});
    	
    	$(this.el).children('.project-desc').removeClass('project-desc-minimized').addClass('project-desc-expanded');
    },
    
    collapseView: function() {
    	$(this.el).removeClass('project-thumbnail-expanded').addClass('project-thumbnail-minimized');
    	//$(this.el).addClass('project-thumbnail-minimized');
    	
    	var p_img = $(this.el).children('.project-hero-img');
    	p_img.removeClass('project-hero-img-expanded').addClass('project-hero-img-collapsed');
    	p_img.children('.project-thumbnail-list').fadeOut('fast');
    	
    	$(this.el).children('.project-desc').removeClass('project-desc-expanded').addClass('project-desc-minimized');
    }

});

CADENT.ProjectEditListView = Backbone.View.extend({

	initialize: function () {
	    this.render();
	},

	render: function () {
		var projects = this.model.models;
        var len = projects.length;
		//var startPos = (this.options.page - 1) * 8;
		//var endPos = Math.min(startPos + 8, len);

		$(this.el).html('<ul class="thumbnails"></ul>');
		//var str = 'PROJECTS<br><br>';
		//var str = JSON.stringify(this.model, undefined, 2);
		
        for (var i = 0; i < len; i++) {
            //str.concat(projects[i].name, '<br>');
            
            $('.thumbnails', this.el).append(new CADENT.ProjectEditListItemView({model: projects[i]}).render().el);
        }
        
		//$(this.el).html(str);
		//(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

CADENT.ProjectEditListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        //this.model.bind("change", this.render, this);
        //this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});