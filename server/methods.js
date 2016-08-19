import {Reviews} from '../imports/api/reviews.js'
import {check} from 'meteor/check'

Meteor.users.allow( {
	update: function() {
		console.log("usersisclient", Meteor.isClient);

		return Meteor.isServer	;
	}
});

Reviews.allow( {
	insert: function() {
		console.log("Reviewisclient", Meteor.isClient);
		return true;
	}
});
/*
   Meteor.users.deny( {
   update: function() {
   return false;
   }
   });
   */
if(Meteor.isServer) {
	Meteor.methods({
		'insertReviewToUser': function(result) {
			if (Meteor.userId() && result && result.reviewer === Meteor.userId()) {
				var schema = Reviews.simpleSchema();
				check(result, schema);
				schema.clean(result);

				var exists = Meteor.users.findOne({
					"_id": Meteor.userId(),
					"reviews.type": result.reviewType,
					"reviews.reviewee": result.reviewee});

				if(!exists) {
					Meteor.users.update({_id: Meteor.userId()},
							{$addToSet: {reviews: result}});
				}
			}
		}
	});
}
