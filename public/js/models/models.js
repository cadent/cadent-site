CADENT.Project = Backbone.Model.extend({

    urlRoot: "/projects",

    idAttribute: "_id",

    initialize: function () {
        
    },

    defaults: {
        _id: null,
        name: "Missing Name",
        pid: "Missing_PID",
        subtitle: 'Missing Subtitle',
        url: "",
        desc: "Missing Description",
        imgs: ['image_ph.jpg','image_ph_2.jpg','image_ph.jpg','image_ph_2.jpg','image_ph.jpg','image_ph_2.jpg','image_ph.jpg'],
        tech: ['PHP', 'MySQL', 'JS'],
        role: ['Design', 'DB Architecture', 'Front-End Dev']
    }
});

CADENT.ProjectCollection = Backbone.Collection.extend({

    model: CADENT.Project,

    url: "/projects"

});

CADENT.Tag = Backbone.Model.extend({

    urlRoot: "/tags",

    idAttribute: "_id",

    initialize: function () {
        
    },

    defaults: {
        _id: null,
        name: "Missing Name",
        desc: "Missing Description"
    }
});

CADENT.ThumbImg = Backbone.Model.extend({

    initialize: function () {
        
    },

    defaults: {
        thumb_url: "img/thumbnails/thumb_ph.jpg",
        img_url: "img/projects/project_ph.jpg",
        selected: false,
        selectCallback: null
    }
});