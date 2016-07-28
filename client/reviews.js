import { Reviews } from '../imports/api/reviews.js';
import { Users } from '../imports/api/users.js';
AutoForm.debug();

Template.ReviewFormTemplate.helpers({
	name: function(doc) {
		console.log("helpers", this.name);
		console.log("helpers", Template.instance().data);
		console.log("helpers", doc);
		return "hi";

	}


});

Template.ReviewFormTemplate.onCreated(
	function() {
		this.reviewee = "sesset";
		console.log(this);
	}
);
	
AutoForm.hooks({
	insertReview: {
		   onSubmit: function(doc) {
		   console.log("doc:", doc);
		   console.log("doc:", this);
		   console.log("idoc:", this.insertDoc);
		   this.result(doc);
		   },
		before: { 
			//insert: function(doc) {console.log("after!", this.docID),
			method: function(doc) {
				doc.Reviewee = "69";
				doc.insertDoc.Reviewee = "69";
				console.log("before!", this);
				console.log("before!", doc);
				console.log("before!", this.reviewee);
				//this.result(doc);
			}
		},
		after: { 
			//insert: function(doc) {console.log("after!", this.docID),
			method: function(doc) {
				console.log("after!", doc);
				console.log("after!", this);
		   console.log("idoc:", this.insertDoc);
			
			}
		},
		onSuccess: function(formType, result) { 
			Meteor.call('addReview', this.docId, function(error, result) {
				if(error) {
					console.log(error);
				}
			});

		}
	}
});


