// Define main namespace
CADENT = window.CADENT || {};

CADENT.AppView = Backbone.View.extend({

	// App top-level element
	el: '#container',

	events: {
		//'keyup #new-evt-field': 'createEvtOnEnter',
		//'keypress #new-evt-field': 'mainKeyDown',
		//'click #new-evt': 'newEvt',
		//'click #delete-evt': 'deleteEvt'
	},

	initialize: function() {
		
		console.log('AppView Init');

	}
});

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

CADENT.TagView = Backbone.View.extend({

    events: {
		'click .x-button'	: 'deleteTag'
	},
	
    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    
	deleteTag : function( e ) {
		e.preventDefault(); 
		console.log('Submit!');
		this.model.destroy(null, {
            success: function (model) {
                console.log('Deleted Successfully');
            },
            error: function () {
                //utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                console.log('Error Deleting');
            }
        });
	}

});

CADENT.TagEditView = Backbone.View.extend({

    events: {
		'click #b_tag_submit'	: 'addTag',
		"change"        		: "change",
	},
	
    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },
	
	change: function ( e ) {
        // Apply the change to the model
        var target = e.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
        console.log(change[target.name] + ' changed to: ' + target.value);
    },
    
	addTag : function( e ) {
		e.preventDefault(); 
		console.log('Submit!');
		this.model.save(null, {
            success: function (model) {
                //self.render();
                //app.navigate('wines/' + model.id, false);
                //utils.showAlert('Success!', 'Wine saved successfully', 'alert-success');
                console.log('Saved Successfully');
            },
            error: function () {
                //utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                console.log('Error Saving');
            }
        });
	}

});