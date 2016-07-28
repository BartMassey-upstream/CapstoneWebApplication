import { Reviews } from '../imports/api/reviews.js';
import { reviewSchema } from '../imports/api/reviews.js';
import { Users } from '../imports/api/users.js';
import { check } from 'meteor/check'

Reviews.deny({
	insert: function(userId, doc) {
		if(!(userId && doc && doc.reviewee)) {
			return true;
		}
		var data = Meteor.users.findOne({_id: doc.reviewee});
		return (data === undefined);
	},
	update: function() {
		return true;
	}
});
Meteor.users.deny({
	update: function() {
		return true;
	}
});

if (Meteor.isServer) {

	/*
Meteor.publish('revieweeInfo', function (id) {
		//var info = Meteor.users.findOne({_id: id});
		//data = {};
		//data.name = info && info.profile && info.profile.name;
		//data.reviewee = id;
		//var options = {fields: {'profile': 1, _id: 1}};
		//return Meteor.users.findOne({_id: id}, options);
		var options = {fields: {profile:1, _id: 1}};
		return Meteor.users.findOne({_id: id}, options);
		//return data;
});
*/

	
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
		data.name = info && info.profile && info.profile.name;
		data.reviewee = id;
		return data;
	}

});
}

