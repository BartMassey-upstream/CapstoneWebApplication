import React, { Component, PropTypes } from 'react';
import StudentInfoList from './StudentInfoList';
import { Meteor } from 'meteor/meteor'
import api from '../../../client/api.js';

export default class StudentDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            studentData: null
        };
    }
    
    componentDidMount() {
        // getUsersForTeam returns a promise. When the promise is resolved
        // call this.setState to store the payload in 'studentData'
        // This will trigger a re-render of the component and pass along the payload
        api.users.getUsersForTeam(2).then((data) => { this.setState({studentData: data}); });
    }

    render() {
        if (this.state.studentData) {
            return (
                <StudentInfoList students={this.state.studentData}/>
            );
        }
        return (<div>Loading...</div>);
    }
}
