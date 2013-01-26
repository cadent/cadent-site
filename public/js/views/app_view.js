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

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }

});

CADENT.HeaderView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }

});

CADENT.FooterView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
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