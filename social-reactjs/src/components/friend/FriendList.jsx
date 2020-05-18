import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import FriendItem from './FriendItem';
import { getFriends } from '../../actions/friendActions';
class FriendList extends Component {
    componentDidMount() {
        this.props.getFriends();
    }
    render() {
        const { people, loading } = this.props.friend;
        const { otherUsers, friends, sentRequests, incommingRequests } = people;
        let otherUsersItems, friendsItems, sentRequestsItems, incommingRequestsItems;
        if (otherUsers === null || friendsItems === null || sentRequestsItems === null || incommingRequestsItems === null || loading) {
            otherUsersItems = <Spinner />
        } else {
            //Other user
            if (otherUsers.length > 0) {
                otherUsersItems = otherUsers.map(otherUser => (
                    <FriendItem key={otherUser._id} friend={otherUser} type="other" />
                ))
            } else {
                otherUsersItems = <h4>Không tìm thấy người dùng </h4>
            }
            //Friend
            if (friends.length > 0) {
                friendsItems = friends.map(friend => (
                    <FriendItem key={friend._id} friend={friend} type="friend" />
                ))
            } else {
                friendsItems = <h4>Không có bạn bè</h4>
            }
            //Sent request
            if (sentRequests.length > 0) {
                sentRequestsItems = sentRequests.map(sentRequest => (
                    <FriendItem key={sentRequest._id} friend={sentRequest} type="sent" />
                ))
            } else {
                sentRequestsItems = <h4>Không có lời mời đã gửi </h4>
            }
            //Incomming request
            if (incommingRequests.length > 0) {
                incommingRequestsItems = incommingRequests.map(incommingRequest => (
                    <FriendItem key={incommingRequest._id} friend={incommingRequest} type="incomming" />
                ))
            } else {
                incommingRequestsItems = <h4>Không có lời mời kết bạn </h4>
            }
        }
        return (
            <div>
                <section className="companies-info">
                    <div className="container">
                        <div className="company-title">
                            <h3>Danh sách bạn bè</h3>
                        </div>
                        <div className="companies-list">
                            <div className="row">
                                {friendsItems}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="companies-info">
                    <div className="container">
                        <div className="company-title">
                            <h3>Đã gửi lời mời</h3>
                        </div>
                        <div className="companies-list">
                            <div className="row">
                                {sentRequestsItems}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="companies-info">
                    <div className="container">
                        <div className="company-title">
                            <h3>Bạn bè có thể bạn biết</h3>
                        </div>
                        <div className="companies-list">
                            <div className="row">
                                {otherUsersItems}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="companies-info">
                    <div className="container">
                        <div className="company-title">
                            <h3>Lời mời kết bạn</h3>
                        </div>
                        <div className="companies-list">
                            <div className="row">
                                {incommingRequestsItems}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
FriendList.propTypes = {
    getFriends: PropTypes.func.isRequired,
    friend: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    friend: state.friend
});

export default connect(mapStateToProps, { getFriends })(FriendList);

