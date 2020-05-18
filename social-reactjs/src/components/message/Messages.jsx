import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageForm from './MessageForm';
import { socket } from '../../utils/socketService';
import isEmpty from '../../utils/isEmpty';
import classnames from 'classnames';
class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: {}
        }
    }
    componentDidMount() {
        socket.on('SERVER_MESSAGE', message => {
            var data = {
                user: message.user,
                message: message.message,
                room: message.idRoom,
                _id: message._id
            }
            this.setState({
                room: { _id: data.room, messages: [...this.state.room.messages, data] }
            })
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ room: nextProps.room });
    }
    render() {
        const { auth } = this.props;
        const { room } = this.state;
        let userMessages;
        if (!isEmpty(room)) {
            userMessages = (
                <div className="main-conversation-box">
                    <div className="messages-line">
                        <div className="main-message-box">
                        </div>
                        {room.messages.map(message => (
                            <div key={message._id} className={classnames('main-message-box', { 'ta-right': message.user._id === auth.user.id, 'st3': message.user._id !== auth.user.id })}>
                                <div className={classnames('message-dt', { 'st3': message.user._id !== auth.user.id })}>
                                    <div className="message-inner-dt">
                                        <p>{message.message}</p>
                                    </div>
                                    <span>{message.user.name}</span>
                                </div>
                                <div className="messg-usr-img">
                                    <img src={message.user.avatar} width="50px" height="50px" alt={message.user.name} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <MessageForm room={room._id} />
                </div>
            )
        } else {
            userMessages = null
        }
        return userMessages;
    }
}
Messages.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Messages);
