import { Reviews } from '../imports/api/reviews.js';
import { Users } from '../imports/api/users.js';
import { Session } from 'meteor/session';
AutoForm.debug();

Template.ReviewFormTemplate.helpers({
	name: function(doc) {
		return Session.get("revieweeName");
	}
});

/*
Template.ReviewFormTemplate.onCreated(
	function() {
		Meteor.subscribe('revieweeInfo');

	}
);
*/
	
AutoForm.hooks({
	insertReview: {
		onSuccess: function(formType, result) { 
			Meteor.call('addReview', this.docId, function(error, result) {
				if(error) {
					console.log(error);
				}
			});

		}
	}
});


