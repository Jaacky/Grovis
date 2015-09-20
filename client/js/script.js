if (Meteor.isClient) {

	// DASHBOARD
	Template.dashboard.helpers({
		visi: function() {
			console.log(Visi.find({}).count());
			return Visi.find({});
		},

		user: function() {
			console.log(Meteor.user());
			if (Meteor.user()) {
				return Meteor.user().username || Meteor.user().profile.name;
			} else {
				throw new Meteor.Error("not-authorized");
			}
		},
	});

	Template.dashboard.events({
		"click .visRow": function(event) {
			var url = '/vis/' + this._id;
			Router.go(url);
		},

		"click .delete": function(event) {
			Visi.remove(this._id);
		},
	});

	// VISCREATE
	Template.visCreate.helpers({
		facebookID: function() {
			if (Meteor.user() || Meteor.loggingIn()) {
				return Meteor.user().services.facebook.id;
			} else {
				throw new Meteor.Error("not-authorizedla");
			}
		},
	});

	Template.visCreate.events({
		"submit .new-vis": function(event) {
			event.preventDefault();
			var title = event.target.title.value;
			//var wholeNumber = $(event.target.wholeNumber).is(":checked");
			var userID = Meteor.user().services.facebook.id; // should test whether user exists

			Visi.insert({
				title: title,
				createdAt: new Date(),
				//wholeNumber: wholeNumber,
				userID: userID,
			});

			//event.target.title.value = "";
			//console.log($(event.target.wholeNumber).checked);
			Router.go('/dashboard');
		},
	});

	// VIS
	Template.vis.helpers({
		test: function() {
			if (Meteor.user() || Meteor.loggingIn()) {
				return Meteor.user().services.facebook.id;
			} else {
				throw new Meteor.Error("not-authorized");
			}
		}
	});

	Template.vis.events({
		"submit .vis-updater": function(event) {
			event.preventDefault();
			var when = event.target.when.value;
			var value = event.target.value.value;
			var id = event.target.id.value;

			var series = {'id': id, 'key': when, 'value': value};
			console.log(series);
			Visi.update(id, {
				$push: { series : series }
			});
		},

		"click .delete": function(event) {
			console.log(this);
			var found = Visi.findOne(this.id);
			console.log(found);
		},
	});
}