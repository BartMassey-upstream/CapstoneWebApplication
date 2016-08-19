import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';

export default class ReviewForm extends Component {

	componentDidMount() {
		var reviewData = this.props;
		this.view = Blaze.renderWithData(
				Template.ReviewFormTemplate,
				reviewData,
				ReactDOM.findDOMNode(this.refs.container)
				);
	}

	componentWillUnmount() {
		Blaze.remove(this.view);
	}

	render() {
		return <span ref="container" />;
	}
}

AutoForm.addHooks('insertReview', {
	after: {
		insert: function (error, result) {
			if (error) {
				console.log("Insert Error:", error);
			} else {
				//console.log("Document inserted:", result);
				Meteor.call('insertReviewToUser', this.insertDoc);
			}
		}
	},
	onSuccess: function() {
		document.location.reload(true);
	}
});
