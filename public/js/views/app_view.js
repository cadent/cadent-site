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
		
		// UI controls
		//this.inputEvt = this.$('#new-evt-field');
		
		// Structural UI elements
		//this.$footer = this.$('.evt-app-footer');
		//this.$main = this.$('#main');
		
		/*
		this.header = new HeaderView();
        $('.header').html(this.header.el);
        
        this.footer = new FooterView();
        $('.footer').html(this.footer.el);
		*/
		
		// Load event types
		//Tracr.event_types = new Tracr.EvtTypes();
		
		// Load recent / relevant events
		//Tracr.summary = new Tracr.EvtSummary();
		//Tracr.summary.bind('reset', this.addAllSummary, this);
		//Tracr.summary.loadAll();
		
		// init AddSleep view for testing
		//var sleepView = new Tracr.AddEvtSleep({model: new Tracr.Evt()});
		//this.$("#evt-new-holder").append(sleepView.render().el);
	}/*,
	
	rebuildSummary: function( e ) {
		console.log('Event Summary Changed - len: ' + Tracr.summary.length);
	},
	
	addOneSummary: function( evt ) {
      var view = new Tracr.EvtSummaryView({model: evt});
      this.$("#evt-list").append(view.render().el);
    },
    
    addAllSummary: function() {
      Tracr.summary.each(this.addOneSummary);
    },

	createEvtOnEnter: function( e ) {
		
		if ( e.which !== 13 || !this.inputEvt.val().trim() ) {
			this.processInput();
			//return;
		}
		
		//alert(this.inputEvt.val());
	},
	
	mainKeyDown: function( e ) {
		//console.log('Tracr.event_types event_type_label: ' + Tracr.event_types.at(0).get('event_type_label'));
		//console.log('Tracr.summary event_label: ' + Tracr.summary.at(0).get('event_label'));
		if(e.which == 32) {
			console.log("Space Detected - word = " + this.inputEvt.val());
		}
	},
	
	processInput: function() {
		//alert(this.inputEvt.val());
	},

	newEvt: function() {
		
	},
	
	deleteEvt: function() {
		
	}
	*/
});