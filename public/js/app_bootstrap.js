/**
 * BOOTSTRAP
 */

DRIVATIV.utils.loadTemplate([
	{name:'HeaderView', path:'tpl', ext:'html'},
	{name:'FooterView', path:'tpl', ext:'html'}
	], function() {
    	CADENT.app = new CADENT.App();
		CADENT.appView = new CADENT.AppView();
		Backbone.history.start();
	}, window.CADENT
	);
