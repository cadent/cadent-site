CADENT = window.CADENT || {};

CADENT.HomeView = Backbone.View.extend({

    events: {
		'click #b_view_projects'	: 'viewProjects'
	},
	
    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    
    viewProjects: function() {
    	CADENT.app.navigate('projects', true);
    }

});

CADENT.ContactView = Backbone.View.extend({

    events: {
		//'click #b_view_projects'	: 'viewProjects'
	},
	
    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    
    viewProjects: function() {
    	CADENT.app.navigate('projects', true);
    }

});

CADENT.HeaderView = Backbone.View.extend({

    tagName					: 'header',
    className				: 'header',
    
    events: {
		'click .img-logo'	: 'viewHome',
		'click .nav-item'	: 'viewNav'
	},
	
    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    
    viewNav : function ( e ) {
    	console.log('click: ' + $(e.currentTarget).attr('id').split('_')[1]);
    	CADENT.app.navigate($(e.currentTarget).attr('id').split('_')[1], true);
    },
    
    viewHome: function() {
    	CADENT.app.navigate('about', true);
    }

});

CADENT.FooterView = Backbone.View.extend({

    lang_tags: ['JavaScript','PHP 5+','MySQL','HMTL / HTML5','CSS / CSS3','JSON','XML','NoSQL','ActionScript','MXML','Flex 4.7 / Flash CS6'],
    tech_tags: ['jQuery','Backbone.js','API (REST)','Node.js','LESS / SCSS','Zend','CakePHP','MongoDB','CL','git / GitHub / SVN','Photoshop CS6','Illustrator CS6','InDesign CS6', 'What you got..?'],
    
    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        
        for (var i = 0; i < this.lang_tags.length; i++) {
            $('.services-tech-list', this.el).append('<div class="services-tag-view services-tag-lang">' +  this.lang_tags[i] + '</div>');
        }
        
        for (var i = 0; i < this.tech_tags.length; i++) {
            $('.services-tech-list', this.el).append('<div class="services-tag-view services-tag-tech">' +  this.tech_tags[i] + '</div>');
        }
        
        return this;
    }

});
