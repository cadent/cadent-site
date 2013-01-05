CADENT.AdminView = Backbone.View.extend({

    events: {
		'click #b_project_submit'	: 'addProject',
		"change"        			: "change",
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
    
	addProject : function() {
		console.log('Submit!');
	}

});