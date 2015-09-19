if (Meteor.isClient) {

	Template.dashboard.helpers({
		visi: function() {
			console.log(Visi.find({}).count());
			return Visi.find({});
		},

		user: function() {
			return Meteor.user().username || Meteor.user().profile.name
		},
	});

	Template.visCreate.events({
		"submit .new-vis": function(event) {
			event.preventDefault();
			var title = event.target.title.value;

			Visi.insert({
				title: title,
				createdAt: new Date(),
			});

			event.target.title.value = "";
		},
	});
}