CADENT.Project = Backbone.Model.extend({

    urlRoot: "/projects",

    idAttribute: "_id",

    initialize: function () {
        
    },

    defaults: {
        _id: null,
        name: "Missing Name",
        pid: "Missing_PID",
        url: "",
        desc: "Missing Description"
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