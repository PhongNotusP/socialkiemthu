import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeFriend, cancelRequest, sendRequest, acceptRequest, declineRequest } from '../../actions/friendActions';
import { createRoom } from '../../actions/messageActions';
import { Link } from 'react-router-dom';
class FriendItem extends Component {
    onRemoveFriend(id) {
        this.props.removeFriend(id);
    }
    onCancelRequest(id) {
        this.props.cancelRequest(id);
    }
    onAddFriend(id) {
        this.props.sendRequest(id);
    }
    onAcceptRequest(id) {
        this.props.acceptRequest(id);
    }
    onDeclineRequest(id) {
        this.props.declineRequest(id);
    }
    onCreateRoom(id) {
        this.props.createRoom(id);
    }
    render() {
        const { friend } = this.props
        const { type } = this.props;
        let buttonType;
        if (type === 'other') {
            buttonType = (
                <ul>
                    <li><a href="#!" className="follow" onClick={this.onAddFriend.bind(this, friend._id)}>Thêm bạn</a></li>
                </ul>
            )
        } else if (type === 'friend') {
            buttonType = (
                <ul>
                    <li><a href="#!" className="hire-us" onClick={this.onRemoveFriend.bind(this, friend._id)}>Hủy kết bạn</a></li>
                    <li><a href="#!" className="message-us" onClick={this.onCreateRoom.bind(this, friend._id)}><i className="fa fa-envelope"></i></a></li>
                </ul>
            )
        } else if (type === 'sent') {
            buttonType = (
                <ul>
                    <li><a href="#!" className="hire-us" onClick={this.onCancelRequest.bind(this, friend._id)}>Hủy gửi lời mời</a></li>
                </ul>
            )
        } else if (type === 'incomming') {
            buttonType = (
                <ul>
                    <li><a href="#!" className="follow" onClick={this.onAcceptRequest.bind(this, friend._id)}>Chấp nhận</a></li>
                    <li><a href="#!" className="hire-us" onClick={this.onDeclineRequest.bind(this, friend._id)}>Từ chối</a></li>
                </ul>
            )
        }
        return (
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                <div className="company_profile_info">
                    <div className="company-up-info">
                        <img src={friend.avatar} alt={friend.name} width="91px;" height="91px;" />
                        <h3>{friend.name}</h3>
                        {buttonType}
                    </div>
                    <Link to={`/profile/${friend._id}`} className="view-more-pro">Xem thông tin</Link>
                </div>
            </div>
        )
    }
}
FriendItem.propTypes = {
    friend: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    removeFriend: PropTypes.func.isRequired,
    cancelRequest: PropTypes.func.isRequired,
    sendRequest: PropTypes.func.isRequired,
    acceptRequest: PropTypes.func.isRequired,
    declineRequest: PropTypes.func.isRequired,
    createRoom:  PropTypes.func.isRequired
}

const mapStateToProps = state => ({

});
export default connect(mapStateToProps, { removeFriend, cancelRequest, sendRequest, acceptRequest, declineRequest, createRoom })(FriendItem);
