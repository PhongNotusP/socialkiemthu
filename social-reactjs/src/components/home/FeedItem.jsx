import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removePost, likePost, unlikePost } from '../../actions/postActions';
import CommentForm from './CommentForm';
import Moment from 'react-moment';
import Comment from './Comment';
class FeedItem extends Component {
    onDeleteClick(id) {
        if (window.confirm("Bạn có muốn xóa không ?")) {
            this.props.removePost(id);
        }
    }

    onLikeClick(id) {
        this.props.likePost(id);
    }

    onUnlikeClick(id) {
        this.props.unlikePost(id);
    }

    isLiked(likes) {
        const { auth } = this.props;
        return likes.includes(auth.user.id);
    }
    render() {
        const { post, auth } = this.props;
        return (
            <div className="post-bar">
                <div className="post-bar no-margin">
                    <div className="post_topbar">
                        <div className="usy-dt">
                            <img src={post.author.avatar} width="50px;" height="50px;" alt={post.author.name} />
                            <div className="usy-name">
                                <h3>{post.author.name}</h3>
                                <span><img src={window.location.origin + '/template/images/clock.png'} alt="" /><Moment format="HH:mm DD/MM/YYYY">{post.date}</Moment></span>
                            </div>
                        </div>
                        {post.author._id === auth.user.id ? (
                            <div className="ed-opts">
                                <a href="#!" onClick={this.onDeleteClick.bind(this, post._id)} style={{ fontSize: '24px' }}><i className="la la-close"></i></a>
                            </div>
                        ) : null}
                    </div>
                    <div className="job_descp">
                        <p>{post.content}</p>
                    </div>
                    <div className="job-status-bar">
                        <ul className="like-com">
                            {this.isLiked(post.fans) ? (
                                <li>
                                    <a href="#!" onClick={this.onUnlikeClick.bind(this, post._id)}><i className="la la-heart"></i> Unlike</a>
                                </li>
                            ) : (
                                    <li>
                                        <a href="#!" onClick={this.onLikeClick.bind(this, post._id)}><i className="la la-heart-o"></i> Like</a>
                                    </li>
                                )}
                        </ul>
                        <a href="#!"><i className="la la-heart"></i>Lượt like {post.fans.length}</a>
                    </div>
                </div>
                <div className="comment-section">
                    <div className="comment-sec">
                        <ul>
                            <li>
                                <Comment comments={post.comments} />
                            </li>
                        </ul>
                    </div>
                    <div className="post-comment">
                        <CommentForm postId={post._id} />
                    </div>
                </div>
            </div>
        )
    }
}

FeedItem.propTypes = {
    removePost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { removePost, likePost, unlikePost })(FeedItem);
