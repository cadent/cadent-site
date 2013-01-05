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

    model: Project,

    url: "/projects"

});