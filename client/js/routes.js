Router.route('/', function () {
	this.layout('layout');
 	this.render('home');
});
 
Router.route('/dashboard', function () {
	this.layout('layout');
 	this.render('dashboard');
});

Router.route('/graph', function () {
	this.layout('layout');
 	this.render('graph');
});

 