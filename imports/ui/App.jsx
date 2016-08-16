import React, { Component } from 'react';
import GoogleUIWrapper from './GoogleUIWrapper';
import { Reviews } from '../api/reviews'; //Do Not Remove
import { Resumes } from '../api/resumes'; //Do Not Remove

Template.registerHelper("Reviews", Reviews);
Template.registerHelper("Resumes", Resumes);

// App component - represents the whole app
export default class App extends Component {
    render() {
        return (
            <div id="wrapper">
                <div id="banner">
                    <div id="psuBarIcon"></div>
                    <p id="psuHeaderText">Portland State University Capstone Website</p>
                </div>
                <GoogleUIWrapper />
                <br/>
                <br/>
                <br/>
                {this.props.children}
				
				<div id="footer">
					<p id="footerText">CS Capstone | PSU</p>
				</div>
            </div>
        );
    }
}