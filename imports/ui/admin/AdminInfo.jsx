import React, { Component, PropTypes } from 'react';
import {Button, Modal, OverlayTrigger, Tooltip, DropdownButton, MenuItem} from 'react-bootstrap';

import ModalButtonComplete from '../ModalButtonComplete';
import ModalButtonIncomplete from '../ModalButtonIncomplete';

import ReviewForm from '../forms/ReviewForm';
import ResumeForm from '../forms/ResumeForm';
import _ from 'lodash';

export default class AdminInfo extends Component {
    constructor(props) {
        super(props);

    }
	
    getReviewForUser(type) {
        let review = null;

        if(type === 'midterm') {
             review = _.find(this.props.user.reviews, (review) => {
                return review.reviewee === this.props.student._id && review.reviewType === 'Midterm';
            });
        } else if (type === 'final') {
            review = _.find(this.props.user.reviews, (review) => {
                return review.reviewee === this.props.student._id && review.reviewType === 'Final';
            });
        }
        return review;
    }


	
    get360ReviewField(type) {
        const review = this.getReviewForUser(type);
        if (!review) {
            return <ModalButtonIncomplete user={this.props.user} reviewType={type} student={this.props.student}/>
        } else {
            return <ModalButtonComplete review={review}/>
        }
    }

	// getResumeField() {
	// 	if(this.props.student.resume.completed) {
	// 		return (
	// 			// this.getSubmittedButtonResume()
	// 		);
	// 	} else {
	// 		return (
	// 			// this.getResumeForm()
	// 		);
	// 	}
	// }

    getTeamDropdown() {
        return (
            <DropdownButton title={this.props.student.team}>
                {this.props.teams.map((team) => {
                    return <MenuItem>{team}</MenuItem>
                })}
            </DropdownButton>
        );
    }

    getRoleDropdown() {
        return (
            <DropdownButton title={this.props.student.role}>
                {this.props.roles.map((role) => {
                    return <MenuItem>{role}</MenuItem>
                })}
            </DropdownButton>
        );
    }
	
    render() {
        return (
                <tr>
                    <td>{this.props.student.services.google.name}</td>
					<td>{this.getRoleDropdown()}</td>
					<td>{this.getTeamDropdown()}</td>
                    <td>{this.props.student.services.google.email}</td>
					<td>
						<center>
							{/*{this.getResumeField()}*/}
						</center>
					</td>
                    <td>
                        <center>
                            {this.get360ReviewField('midterm')}
                        </center>
                    </td>
                    <td>
                        <center>
                            {this.get360ReviewField('final')}
                        </center>
                    </td>
                </tr>
        );
    }
}
