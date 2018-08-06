import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import history from '../../history';
import NewNewsletterForm from './newsletterNewForm';

class EditNewsletter extends Component {
    onSubmit = fields => {
        history.push('/dashboard');
    }

    onCancel = () => {
        history.goBack();
    }

    componentDidMount() {
        this.props.fetchNewsletterWithID(this.props.match.params.id);
    }

    render() {
        return (
            <div className="new-newsletter">
                <NewNewsletterForm
                    newsletterToEdit={this.props.requestedNewsletter}
                    onSubmit={event => this.onSubmit(event)}
                    onCancel={() => this.onCancel()}
                    formTitle="Edit Newsletter"
                    fieldOneTitle='Newsletter Title'
                    fieldTwoTitle='Body'
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { requestedNewsletter } = state.newsletters;
    return {
        requestedNewsletter
    }
}

export default connect(mapStateToProps, actions)(EditNewsletter);