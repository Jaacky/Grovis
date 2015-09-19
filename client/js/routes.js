Router.configure({layoutTemplate: 'layout'});

Router.onBeforeAction(function () {
  if (!(Meteor.user() || Meteor.loggingIn())) {
    this.redirect('login');
  } else {
    this.next();
  }
}, {except: ['login']});

Router.onBeforeAction(function() {
	if (Meteor.user()) {
		this.redirect('dashboard');
	} else {
		this.next();
	}
}, {only: ['login']});

Router.route('/', function () {
 	this.render('home');
});

Router.route('/login', function() {
	this.render('login');
});
 
Router.route('/dashboard', function () {
 	this.render('dashboard');
});

Router.route('/graph', function () {
 	this.render('graph');
});

Router.route('/visCreate', function() {
	this.render('visCreate');
});