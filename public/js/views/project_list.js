CADENT = window.CADENT || {};
CADENT.activeProject = null;

CADENT.ProjectListView = Backbone.View.extend({

	events: {
		'click #b_view_github'	: 'visitGithub'
	},
	
	initialize: function () {
	    this.render();
	},

	render: function () {
		var projects = this.model.models;
        var len = 10;
		//var len = projects.length;
		//'<div id="about-cadent" class="spacer">projects</div>'
		$(this.el).html('<div id="about-cadent" class="spacer">Recent Projects</div><div id="b_view_github" class="details-button"><span>+ View this Site on GitHub</span></div><div class="project-thumbnails"></div>');

		
        for (var i = 0; i < len; i++) {
            $('.project-thumbnails', this.el).append(new CADENT.ProjectListItemView({model: new CADENT.Project()}).render().el);
            //$('.thumbnails', this.el).append(new CADENT.ProjectListItemView({model: projects[i]}).render().el);
        }

        return this;
   },
    
    visitGithub : function () {
    	console.log('visit github');
    }
});

CADENT.ProjectImgThumbView = Backbone.View.extend({

    tagName: 'div',
    className: 'project-thumb-img',
    selected: false,
    
    events: {
		'click'		: 'selectImg',
		'mouseover' : 'onImg',
		'mouseout' 	: 'offImg'
	},
	
    initialize: function () {
        this.render();
    },

    render: function () {
        
        if(this.model.get('selected')) {
        	$(this.el).html('<img src="' + this.model.get('thumb_url') + '">');
        	this.selected = true;
        } else {
        	$(this.el).html('<img src="' + this.model.get('thumb_url') + '">');
        	$(this.el).addClass('thumb-deselected');
        	$(this.el).find('img').fadeTo(500, 0.5);
        }
        
        return this;
    },
    
    onImg: function( e ) {
    	if(!this.selected) {
    		$(this.el).find('img').fadeTo(500, 1);
    	}
    },
    
    offImg: function( e ) {
    	if(!this.selected) {
    		$(this.el).find('img').fadeTo(500, 0.5);
    	}
    },
    
    selectImg: function() {
    	this.selected = true;
    	var f = this.model.get('selectCallback');
    	var heroImg = this.model.get('tgtImg');
    	var new_url = this.model.get('img_url');
    	
    	$(this.el).find('img').fadeTo(500, 1);

    	
	   heroImg.fadeOut(300, function(){
	      heroImg.attr('src',new_url).bind('onreadystatechange load', function(){
	         if (this.complete) heroImg.fadeIn(300);
      		});
   		});
    	
    	if(f != null) {
    		f(this);
    		$(this.el).removeClass('thumb-deselected');
    	}
    	
		$('html, body').animate({
			scrollTop: $(this.el).offset().top
		}, 2000);
    },
    
    deselectImg: function() {
    	this.selected = false;
    	$(this.el).addClass('thumb-deselected');
    	$(this.el).find('img').fadeTo(500, 0.5);
    }

});

CADENT.ProjectListItemView = Backbone.View.extend({

    tagName: 'div',
    className: 'project-thumbnail project-thumbnail-minimized',
    selectedThumb: null,
	
	events: {
		'click .project-hero-img > img'	: 'expandView',
		'click .details-button'			: 'expandView'
	},
	
    initialize: function () {
        //this.model.bind("change", this.render, this);
        //this.model.bind("destroy", this.close, this);
       // this.b_details = $('#b_details span');
    },

    render: function () {
        $(this.el).attr('id', this.model.get('pid'));
        $(this.el).html(this.template(this.model.toJSON()));
        //console.log('imgs: ' + this.model.get('imgs'));
        
    	var p_img = $(this.el).children('.project-hero-img');
        var img_list = p_img.children('.project-thumbnail-list');
        var heroImg = p_img.children('.hero-img');
        heroImg.addClass('greyscale-img');
        //console.log('heroImg: ' + heroImg + ', ' + heroImg.attr('src'));
        	
    	var images = this.model.get('imgs');
    	if(images) {
    		heroImg.attr('src','img/projects/' + images[0]);
    		var len = images.length;
        	var m;
        	
	    	for (var i = 0; i < len; i++) {
				if(i == 0) {
					m = new CADENT.ThumbImg({thumb_url: 'img/thumbnails/' + images[i], img_url: 'img/projects/' + images[i], selected:true, selectCallback:this.selectImg, tgtImg:heroImg});
				} else {
					m = new CADENT.ThumbImg({thumb_url: 'img/thumbnails/' + images[i], img_url: 'img/projects/' + images[i], selected:false, selectCallback:this.selectImg, tgtImg:heroImg});
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
    },
    
    expandView: function() {
    	var last_project = null;
    	
    	if(CADENT.activeProject) {
    		//last_project = CADENT.activeProject;
    		CADENT.activeProject.collapseView();
    	}
    	
    	CADENT.activeProject = this;
    	$(this.el).removeClass('project-thumbnail-minimized').addClass('project-thumbnail-expanded');
    	
    	var p_img = $(this.el).children('.project-hero-img');
    	p_img.removeClass('project-hero-img-collapsed').addClass('project-hero-img-expanded');
    	p_img.children('.project-thumbnail-list').fadeIn('slow');
    	var heroImg = p_img.children('.hero-img');
    	heroImg.removeClass('greyscale-img');
    	//p_img.children('.project-thumbnail-list').fadeIn('slow', function() {
    	//		if(last_project) last_project.collapseView();
    	//	});
    	
    	$(this.el).children('.project-desc').removeClass('project-desc-minimized').addClass('project-desc-expanded');
    	//this.$b_details.removeClass('details-button');
    	//$('#b_details').removeClass('details-button');
    	//$('#b_details span').html('- Less');
    	//this.b_details.html('- Less');
    	console.log('B: ' + $('#b_details').text());
    	
    	//$(this.el).find('details-button').val('- Less');
    },
    
    collapseView: function() {
    	$(this.el).removeClass('project-thumbnail-expanded').addClass('project-thumbnail-minimized');
    	//$(this.el).addClass('project-thumbnail-minimized');
    	
    	var p_img = $(this.el).children('.project-hero-img');
    	p_img.removeClass('project-hero-img-expanded').addClass('project-hero-img-collapsed');
    	p_img.children('.project-thumbnail-list').fadeOut('fast');
    	var heroImg = p_img.children('.hero-img');
    	heroImg.addClass('greyscale-img');
    	$(this.el).children('.project-desc').removeClass('project-desc-expanded').addClass('project-desc-minimized');
    	//$(this.el).find('details-button').val('+ More');
    	console.log('B: ' + $(this.el).find('details-button'));
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