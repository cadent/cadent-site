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

		$(this.el).html('<ul class="thumbnails"></ul>');
		//var str = 'PROJECTS<br><br>';
		//var str = JSON.stringify(this.model, undefined, 2);
		
        for (var i = 0; i < len; i++) {
            //str.concat(projects[i].name, '<br>');
            
            $('.thumbnails', this.el).append(new CADENT.ProjectListItemView({model: projects[i]}).render().el);
        }
        
		//$(this.el).html(str);
		//(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

CADENT.ProjectListItemView = Backbone.View.extend({

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