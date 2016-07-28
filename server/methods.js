import { Reviews } from '../imports/api/reviews.js';
import { reviewSchema } from '../imports/api/reviews.js';
import { Users } from '../imports/api/users.js';
import { check } from 'meteor/check'

if (Meteor.isServer) {
	
Meteor.methods({
	addReview: function(docId) {
		if(docId !== undefined) {
		Meteor.users.update({_id: Meteor.userId()}, 
				{
					$addToSet: {reviews: docId }
				});
		return true;
		}
		else {
			return false;
		}
	},
	findReviewee: function(id) {
		var info = Meteor.users.findOne({_id: id});
		data = {};
		data.name = info.profile.name;
		data.reviewee = id;
		return data;
	}

});
}

