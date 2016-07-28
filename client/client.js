import { Reviews } from '../imports/api/reviews.js';
import { Users } from '../imports/api/users.js';


Router.route('/reviewForm', function(){
    this.render('ReviewFormTemplate');
});
Router.route('/reviewForm/:reviewee', function(){
    this.render('ReviewFormTemplate', {
	    data: function() {
		    info = {};
		    Meteor.call('findReviewee', this.params.reviewee, function(error, result) {
			    if(error) {
				    console.log(error);
			    }
			console.log("info:", result);
			    return result;
			    
		    });
		    return {name: "his", reviewee: "rev"};
		    //console.log("info:", info);
		    //return Meteor.call('findReviewee', this.params.reviewee);

	    }
    });
});

Router.route('/reviewForm/:reviewer/:reviewee', function(){
    this.render('DisplayReviewTemplate', {
        data: function(){
            return Reviews.findOne({reviewer: this.params.reviewer, reviewee: this.params.reviewee});
        }
    });
})
