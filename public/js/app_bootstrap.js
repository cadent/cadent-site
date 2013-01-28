/**
 * BOOTSTRAP
 */

DRIVATIV.utils.loadTemplate([
	{name:'HomeView', path:'tpl', ext:'html'},
	{name:'ContactView', path:'tpl', ext:'html'},
	{name:'HeaderView', path:'tpl', ext:'html'},
	{name:'FooterView', path:'tpl', ext:'html'},
	{name:'ProjectListItemView', path:'tpl', ext:'html'}
	], function() {
    	CADENT.app = new CADENT.App();
		Backbone.history.start();
	}, window.CADENT
);
