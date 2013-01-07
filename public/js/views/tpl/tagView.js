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