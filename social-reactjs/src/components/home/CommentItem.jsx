import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeComment, likeComment, unlikeComment } from '../../actions/commentActions';
import Moment from 'react-moment';
class CommentItem extends Component {
    onDeleteClick(id) {
        if (window.confirm("Bạn có muốn xóa không ?")) {
            this.props.removeComment(id);
        }
    }
    onLikeClick(id) {
        this.props.likeComment(id);
    }

    onUnlikeClick(id) {
        this.props.unlikeComment(id);
    }

    isLiked(likes) {
        const { auth } = this.props;
        return likes.includes(auth.user.id);
    }

    render() {
        const { comment, auth } = this.props;
        return (
            <div className="comment-list">
                <div className="bg-img">
                    <img src={comment.author.avatar} width="40px;" height="40px;" alt={comment.author.name} />
                </div>
                <div className="comment">
                    <h3>{comment.author.name}</h3>
                    <span><img src={window.location.origin + '/template/images/clock.png'} alt="" /><Moment format="HH:mm DD/MM/YYYY">{comment.date}</Moment></span>
                    <p>{comment.content}</p>
                    {this.isLiked(comment.fans) ? (
                        <a href="#!" onClick={this.onUnlikeClick.bind(this, comment._id)}><i className="la la-heart"></i> Unlike  {comment.fans.length} </a>
                    ) : (
                        <a href="#!" onClick={this.onLikeClick.bind(this, comment._id)}><i className="la la-heart-o"></i> Like  {comment.fans.length} </a>
                    )}
                </div>
                <div className="ed-opts">
                    {comment.author._id === auth.user.id ? (
                        <a href="#!" onClick={this.onDeleteClick.bind(this, comment._id)} style={{ fontSize: '14px' }}>Xóa</a>
                    ) : null}

                </div>
            </div>
        )
    }
}

CommentItem.propTypes = {
    removeComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    likeComment: PropTypes.func.isRequired,
    unlikeComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { removeComment, likeComment, unlikeComment })(CommentItem);
