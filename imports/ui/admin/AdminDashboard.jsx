import React, { Component, PropTypes } from 'react';
import AdminInfoList from './AdminInfoList';
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data';
import api from '../../../client/api.js';


export default class AdminDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            teamData: null,
        };

        mixins: [
            Router.State, Router.Navigation, ReactMeteorData
        ];
    }

    getRoles() {

        return ['team-member', 'team-lead', 'admin'];
    }

    getTeams() {
        return ['1','2','3','4','5','6','7','8','9','10'];
    }


	    componentDidMount() {
	        if(this.props.user) {

	        }
	    }

	    setTeamData() {
	        api.users.getUsersForTeam(this.props.user.team).then(
	            (data) => {
	                this.setState({teamData: data});
	            }
	        );
	    }
  
	
    getCurrentUserDocument() {
        // look through the list of users on this team and get the one that is the current logged in user
        return _.find(this.state.teamData, (user) => {
            if(user._id === this.props.user._id) {
                return user;
            }
        });
    }

    getAdminDashboard() {
        if(!this.state.teamData) {
            this.setTeamData();
        }

        return (
            <div>
                <h2>Admin Dashboard</h2>
                <AdminInfoList user={this.getCurrentUserDocument()}
                               students={this.state.teamData}
                               roles={this.getRoles()}
                               teams={this.getTeams()}/>
            </div>
        );
    }

    render() {
        if(this.props.loggingIn) {
            return (<h4>Logging In...</h4>);
        } else if (!this.props.loggingIn && this.props.user){
            return (
                <div>
                    {this.getAdminDashboard()}
                </div>
            );
        } else {
            return (<h4>Please Log In</h4>);
        }

    }
}

export default createContainer(() => ({
    user: Meteor.user(),
    loggedIn: !Meteor.userId(),
    loggingIn: Meteor.loggingIn()
}), AdminDashboard);

