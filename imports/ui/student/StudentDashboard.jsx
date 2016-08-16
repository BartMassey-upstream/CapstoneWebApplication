import React, { Component, PropTypes } from 'react';
import StudentInfoList from './StudentInfoList';
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data';
import api from '../../../client/api.js';

export default class StudentDashboard extends Component {
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

    getStudentDashboard() {
        if(!this.state.teamData) {
            this.setTeamData();
        }

        return (
            <div>
                <h2>Student Dashboard</h2>
                <StudentInfoList user={this.getCurrentUserDocument()} students={this.state.teamData}/>
            </div>
        );
    }

    render() {
        if(this.props.loggingIn) {
            return (<h4>Loggin In...</h4>);
        } else if (!this.props.logginIn && this.props.user){
            return (
                <div>
                    {this.getStudentDashboard()}
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
}), StudentDashboard);