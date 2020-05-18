import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postMessage } from '../../actions/messageActions';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const newMessage = {
            content: this.state.content,
            idRoom: this.props.room
        };

        this.props.postMessage(newMessage);
        this.setState({ content: '' })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <div className="message-send-area">
                <form onSubmit={this.onSubmit}>
                    <div className="mf-field">
                        <input type="text" name="content" value={this.state.content} onChange={this.onChange} placeholder="Type a message here" />
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        )
    }
}
MessageForm.propTypes = {
    postMessage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { postMessage })(MessageForm);
