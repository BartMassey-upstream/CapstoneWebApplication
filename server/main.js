import '../imports/api/users.js';
import '../imports/api/reviews.js';
import '../imports/api/resumes.js';

Accounts.onCreateUser((options, user) => {
    user.reviews = [];
    user.resume = {};
    user.role = 'student';
    user.team = 2;

    if (options.profile) {
        user.profile = options.profile;
    }
    return user
});

function checkWhitelist(user, whitelist) {
    if(user.services && user.services.google && user.services.google.email && whitelist.search(user.services.google.email) != -1) {
        return true;
    } else {
        throw new Meteor.Error(403, "This Email Address is not allowed.");
    }
}

Accounts.validateNewUser((user) => {
    var whitelist;

    try {
        whitelist = Assets.getText('whitelist.csv');
    } catch(err) {
        //if err then allow all emails else check whitelist
        return true;
    }
    
    return checkWhitelist(user, whitelist)

});