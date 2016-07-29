import defer from 'promise-defer';

export default api ={
    users: {
        getUsersForTeam: (teamId) => {
            let deferred = defer();
            Meteor.http.call("GET",'http://localhost:3000/team/'+ teamId, function(error,result){
                deferred.resolve(result.data);
            });
            return deferred.promise;
        }
    }
}