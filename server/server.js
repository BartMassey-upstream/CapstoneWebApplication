import { Reviews } from '../imports/api/reviews.js';
//import { Users } from '../imports/api/users.js';


// route to display all reviews that a specified reviewer has submitted
Router.route('/reviews/:_id', {where: 'server'})
    .get(function(){
        var response;
        if(this.params._id !== undefined){
            var options = {fields: {reviews: 1, _id: 0}};
            var data = Meteor.users.find({_id: this.params._id}).fetch();
            var reviewData = {};

            if(data[0] !== undefined){
                reviewData = Reviews.find({_id: {$in: data[0].reviews}}).fetch();
            }

            if(reviewData.length > 0){
                response = reviewData
            }else{
                response = {
                    "error": true,
                    "message": "Review not found."
                }
            }
        }
        this.response.setHeader('Content-Type',"application/json");
        this.response.end(JSON.stringify(response));
    });

// route to display all midterm/final 360 reviews a user has submitted
Router.route('/reviews/:_id/type/:reviewType', {where: 'server'})
    .get(function(){
        var response;
        if(this.params._id !== undefined){
            var options = {fields: {reviews: 1, _id: 0}};
            var data = Meteor.users.find({_id: this.params._id}).fetch();
            var reviewData = {};

            if(data[0] !== undefined){
                reviewData = Reviews.find({_id: {$in: data[0].reviews}, reviewType: this.params.reviewType}).fetch();
            }

            if(reviewData.length > 0){
                response = reviewData
            }else{
                response = {
                    "error": true,
                    "message": "Review not found."
                }
            }
        }
        this.response.setHeader('Content-Type',"application/json");
        this.response.end(JSON.stringify(response));
    });

// route to display a review that a specified reviewer has submitted for a specified reviewee
Router.route('/reviews/:_id/:reviewee', {where: 'server'})
    .get(function(){
        var response;
        if(this.params._id !== undefined){
            var options = {fields: {reviews: 1, _id: 0}};
            var data = Meteor.users.find({_id: this.params._id}).fetch();
            var reviewData = {};

            if(data[0] !== undefined){
                reviewData = Reviews.find({_id: {$in: data[0].reviews}, reviewee: this.params.reviewee}).fetch();
            }

            if(reviewData.length > 0){
                response = reviewData
            }else{
                response = {
                    "error": true,
                    "message": "Review not found."
                }
            }
        }
        this.response.setHeader('Content-Type',"application/json");
        this.response.end(JSON.stringify(response));
    });


// route to display all reviews
Router.route('/reviews/', {where: 'server'})
    .get(function(){
        var response;
        if(this !== undefined){
            var data = Reviews.find().fetch();
            if(data.length > 0){
                response = data
            }else{
                response = {
                    "error": true,
                    "message": "Reviews not found."
                }
            }
        }
        this.response.setHeader('Content-Type',"application/json");
        this.response.end(JSON.stringify(response));
    });

// route to display list of users by team
Router.route('/team/:teamId', {where: 'server'})
    .get(function(){
        var response;
        if(this !== undefined){
            //var data = Users.find({teamId: parseInt(this.params.teamId)}).fetch();
            var data = Meteor.users.find({"team.id": parseInt(this.params.teamId)}).fetch();
            if(data.length > 0){
                response = data
            }else{
                response = {
                    "error": true,
                    "message": "Team not found."
                }
            }
        }
        this.response.setHeader('Content-Type',"application/json");
        this.response.end(JSON.stringify(response));
    });


