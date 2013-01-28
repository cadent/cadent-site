CADENT.Project = Backbone.Model.extend({

    urlRoot: "/projects",

    idAttribute: "_id",

    initialize: function () {
        
    },

    defaults: {
        _id: null,
        name: "Client Name",
        pid: "Missing_PID",
        subtitle: 'Project Title',
        url: "",
        desc: "Periscopic, a Portland design agency, hired me to implement a complex data visualization application they’d designed, whose purpose was to provide multiple ways to view and sort sockeye salmon spawning data for the past 60 years. I came in as lead architect directing a small team of internal developers and developed the Flex architecture and most of the core components of the piece, including a graph able to handle and aggregate hundreds of data lines and a modeling feature using a physics-heavy exploration view of the data. I also handled the internal navigation, deep linking, and the loading of smaller Flash elements. The application went on to win an award from Communication Arts and was a finalist at the Adobe MAX Awards.",
        imgs: ['deck_1.jpg','deck_2.jpg','deck_3.jpg','deck_4.jpg','deck_5.jpg','deck_6.jpg','deck_7.jpg'],
        tech: ['JS','PHP','MySQL','HTML5','jQuery','Backbone','Node','LESS'],
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
        selectCallback: null,
        tgtImg:null
    }
});