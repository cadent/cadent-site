CADENT = window.CADENT || {};

CADENT.ProjectListView = Backbone.View.extend({

	initialize: function () {
	    this.render();
	},

	render: function () {
		var projects = this.model.models;
        var len = projects.length;
		//var startPos = (this.options.page - 1) * 8;
		//var endPos = Math.min(startPos + 8, len);

		//$(this.el).html('<ul class="thumbnails"></ul>');
		var str = 'PROJECTS<br><br>';
		
        for (var i = 0; i < len; i++) {
            str += projects[i];
            
            //$('.thumbnails', this.el).append(new WineListItemView({model: wines[i]}).render().el);
        }
		$(this.el).html(str);
       // $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});