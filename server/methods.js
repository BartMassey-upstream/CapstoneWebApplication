import {Reviews} from '../imports/api/reviews.js'
import {Resumes} from '../imports/api/resumes'
import {check} from 'meteor/check'

Meteor.users.allow( {
    update: function() {
        return false;
    },
    insert: function() {
        return false;
    },
    remove: function() {
        return false;
    }
});

Reviews.allow( {
    insert: function() {
        return false;
    },
    update: function() {
        return false;
    },
    remove: function() {
        return false;
    }
});

if(Meteor.isServer) {
    Meteor.methods({
        'insertReviewToUser': function(result) {
            if (Meteor.userId() && result && result.reviewer === Meteor.userId()) {
                var schema = Reviews.simpleSchema();
                schema.clean(result);
                check(result, schema);

                var exists = Meteor.users.findOne({
                    "_id": Meteor.userId(),
                    "reviews.type": result.reviewType,
                    "reviews.reviewee": result.reviewee});

                if(!exists) {
                    Meteor.users.update({_id: Meteor.userId()},
                            {$addToSet: {reviews: result}});
                }
            }
        },
        'insertResumeToUser': function (result) {
            if (Meteor.userId() && result && result.userId === Meteor.userId() ) {
                let schema = Resumes.simpleSchema();
                schema.clean(result);
                check(result, schema);

                let userExists = Meteor.users.findOne({
                    "_id": Meteor.userId()
                });

                if(userExists) {
                    Meteor.users.update({_id: Meteor.userId()}, 
                            {$set: {resume: result}});
                }
            }
        },
        'getTeam': function(teamId) {
            check(teamId, Number);

            var response;
            var data;
            var accessCheck = Meteor.users.findOne({_id: Meteor.userId()});
            if (accessCheck && (accessCheck.role === 'admin' || accessCheck.team === teamId )) {
                data = Meteor.users.find({_id: Meteor.userId()}).fetch();
		data.push(Meteor.users.find({_id: {$nin: [Meteor.userId()]}, team: teamId}, {fields:  {
                    team: 1,
                    role: 1,
                    'services.google.name': 1,
                    'services.google.given_name': 1,
                    'services.google.family_name': 1,
                    'services.google.email': 1,
                    'reviews.reviewee': 1,
                    'reviews.reviewType': 1
                }}).fetch());
            }
            if(data && data.length > 0){
                response = data
            }else{
                response = {
                    "error": true,
                    "message": "Users not found."
                }
            }
            return response;
        },
        'adminGetAllUsers': function() {
            var response;
            var data;
            var adminCheck = Meteor.users.findOne({_id: Meteor.userId()});
            if(adminCheck && adminCheck.role === "admin") {
                data = Meteor.users.find().fetch();
            }
            if(data && data.length > 0){
                response = data
            }else{
                response = {
                    "error": true,
                    "message": "Users not found."
                }
            }
            return response;

        },
        'setRole': function(id, role) {
            check(id, String);
            check(role, String);
            var response;
            var data;
            var adminCheck = Meteor.users.findOne({_id: Meteor.userId()});
            if(adminCheck && adminCheck.role === "admin") {
                data = Meteor.users.update({_id: id}, {$set: {"role": role}});
            }
            if(data === 1){
                response = {
                    "message": "Role set."
                }
            }else{
                response = {
                    "error": true,
                    "message": "Role cannot be set."
                }
            }
            return response;

        },
        'setTeam': function(id, team) {
            check(id, String);
            check(team, String);
            var response;
            var data;
            var adminCheck = Meteor.users.findOne({_id: Meteor.userId()});
            var nanCheck = isNaN(team);
            if(!nanCheck && adminCheck && adminCheck.role === "admin" ) {
                data = Meteor.users.update({_id: id}, {$set: {"team": parseInt(team)}});
            }

            if(data === 1){
                response = {
                    "message": "Team set."
                }
            }else{
                response = {
                    "error": true,
                    "message": "Team cannot be set."
                }
            }
            return response;
        }

    });
}
