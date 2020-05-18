import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRoom } from '../../actions/messageActions';
import classnames from 'classnames';
class Friend extends Component {
    onJoinRoom(id, live) {
        this.props.getRoom(id, live);
    }
    render() {
        const { room, live } = this.props;
        return (
            <div className="messages-list">
                <ul>
                    <li className={classnames('', { 'active': room._id === live })} onClick={this.onJoinRoom.bind(this, room._id, live)}>
                        <div className="usr-msg-details">
                            <div className="usr-ms-img">
                                <img src={room.users[0].avatar} alt={room.users[0].name} width="50px" height="50px" />
                            </div>
                            <div className="usr-mg-info">
                                <h3>{room.users[0].name}</h3>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}
Friend.propTypes = {
    getRoom: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { getRoom })(Friend);
