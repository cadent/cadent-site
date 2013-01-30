CADENT = window.CADENT || {};
CADENT.activeProject = null;
CADENT.listItemViews = [];

CADENT.ProjectListView = Backbone.View.extend({

	events: {
		'click #b_view_github'	: 'visitGithub'
	},
	
	initialize: function () {
	    this.render();
	},

	render: function () {
		
// TESTING CODE - START

		var len = 10;
		$(this.el).html('<div id="about-cadent" class="spacer">Recent Projects</div><div id="b_view_github" class="details-button"><span>+ View this Site on GitHub</span></div><div class="project-thumbnails"></div>');

        for (var i = 0; i < len; i++) {
            $('.project-thumbnails', this.el).append(new CADENT.ProjectListItemView({model: new CADENT.Project()}).render().el);
        }

// TESTING CODE - END

// LIVE CODE - START
 /*       
		var projects = this.model.models;
		var len = projects.length;
		CADENT.listItemViews = [];
		
		$(this.el).html('<div id="about-cadent" class="spacer">Recent Projects</div><div id="b_view_github" class="details-button"><span>+ View this Site on GitHub</span></div><div class="project-thumbnails"></div>');
		
        for (var i = 0; i < len; i++) {
            var pliv = new CADENT.ProjectListItemView({model: projects[i]});
            CADENT.listItemViews.push(pliv);
            
            $('.project-thumbnails', this.el).append(pliv.render().el);
            console.log('CADENT.listItemViews: ' + CADENT.listItemViews);
        }
*/
// LIVE CODE - END
        return this;
	},
   
	getListItemView: function ( pid ) {
		var item = null;
		
		for (var i = 0; i < CADENT.listItemViews.length; i++) {
		    console.log('Looking for ' + pid + ', found ' + CADENT.listItemViews[i].getPid());
		    if(CADENT.listItemViews[i].getPid() == pid) {
		    	item = CADENT.listItemViews[i];
		    	break;
		    }
		}
		
		return item;
	},
	
	showDetail: function ( pid ) {
		this.getListItemView(pid).expandView();
	},
    
    visitGithub : function () {
    	window.open('https://github.com/cadent/cadent-site', '_blank');
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
		'click .hero-img-wrapper'		: 'expandView',
		'click .details-button'			: 'toggleView'
	},
	
    initialize: function () {
        //this.model.bind("change", this.render, this);
        //this.model.bind("destroy", this.close, this);
       // this.b_details = $('#b_details span');
    },

    render: function () {
        $(this.el).attr('id', this.model.get('pid'));
        $(this.el).html(this.template(this.model.toJSON()));

        var heroImg = $('.hero-img', this.el);
        $('.hero-img', this.el).addClass('greyscale-img');
        	
    	var images = this.model.get('imgs');
    	if(images) {
    		$('.hero-img', this.el).attr('src','img/projects/' + images[0]);
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
				$('.project-thumbnail-list', this.el).append(v.el);
	        }
    	}
    	
    	var tech_tags = this.model.get('tech');
    	var role_tags = this.model.get('role');
    	
    	if(tech_tags) {
    		for (var i = 0; i < tech_tags.length; i++) {
	            $('.tag-list', this.el).append('<div class="tag-view tag-tech">' +  tech_tags[i] + '</div>');
	        }
    	}
    	
    	if(role_tags) {
    		for (var i = 0; i < role_tags.length; i++) {
	            $('.tag-list-role', this.el).append('<div class="tag-view tag-role">' +  role_tags[i] + '</div>');
	        }
    	}
    	
        return this;
    },
    
    getPid: function () {
    	return this.model.get('pid');
    },
    
    selectImg: function( imgView ) {
    	if(this.selectedThumb){
    		this.selectedThumb.deselectImg();
    	}
    	this.selectedThumb = imgView;
    },
    
    toggleView: function() {
		if(CADENT.activeProject) {
			if(CADENT.activeProject == this) {
				this.collapseView();
				CADENT.activeProject = null;
				CADENT.app.navigate('projects', false);
			} else {
				this.expandView();
			}
		} else {
			this.expandView();
		}
    },
    
    expandView: function() {
    	var last_project = null;
    	CADENT.app.navigate('projects/' + this.model.get('pid'), false);
    	
    	if(CADENT.activeProject) {
    		//last_project = CADENT.activeProject;
    		CADENT.activeProject.collapseView();
    	}
    	
    	CADENT.activeProject = this;
    	
    	$(this.el).removeClass('project-thumbnail-minimized').addClass('project-thumbnail-expanded');
    	$('.project-hero-img', this.el).removeClass('project-hero-img-collapsed').addClass('project-hero-img-expanded');
    	$('.project-desc', this.el).removeClass('project-desc-minimized').addClass('project-desc-expanded');
    	$('.hero-img', this.el).removeClass('greyscale-img');
    	$('#b_details', this.el).text('Hide Details');
    	
    	$('.project-thumbnail-list', this.el).fadeIn('slow', function() {
    			var targetOffset = CADENT.activeProject.$el.offset().top - 65;
				$('html, body').animate({
					scrollTop: targetOffset
				}, 700);
    	});
    },
    
    collapseView: function() {
    	$(this.el).removeClass('project-thumbnail-expanded').addClass('project-thumbnail-minimized');
    	
    	$('.project-hero-img', this.el).removeClass('project-hero-img-expanded').addClass('project-hero-img-collapsed');
    	$('.project-thumbnail-list', this.el).fadeOut('fast');
    	$('.hero-img', this.el).addClass('greyscale-img');
    	$('.project-desc', this.el).removeClass('project-desc-expanded').addClass('project-desc-minimized');
    	$('#b_details', this.el).text('+ Show Details');
    }

});