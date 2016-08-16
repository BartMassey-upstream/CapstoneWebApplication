import React, { Component, PropTypes } from 'react';
import {Table, Panel} from 'react-bootstrap';
import AdminInfo from './AdminInfo';

export default class AdminInfoList extends Component {
    constructor(props) {
        super(props);
    }

    renderAdminInfoList() {
        return this.props.students.map((student) => {
            return (
                <tbody>
                    <AdminInfo student={student} teams={this.props.teams} roles={this.props.roles}/>
                </tbody>
            );
        });
    }

    getAdminInfoHeader() {
        return (
            <thead>
                <tr>
                    <th>Name</th>
				 	<th>Role</th>
					<th>Team</th>
                    <th>Email</th>
					<th>Resume</th>
                    <th>Midterm 360</th>
                    <th>Final 360</th>
					
                </tr>
            </thead>
        );
    }

    render() {
        if(!this.props.students) {
            const style = {
                width: '50%',
                margin: '0 auto'
            }
            return (
                <div style={style}>
                    <h2>No Team Data</h2>
                </div>
            );
        }

        return (
            <Panel defaultExpanded header="Your Team" bsStyle="info">
                <Table fill striped bordered condensed>
                    {this.getAdminInfoHeader()}
                    {this.renderAdminInfoList()}
                </Table>
            </Panel>
        );
    }
}
  