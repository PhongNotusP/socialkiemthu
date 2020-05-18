import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createComment } from '../../actions/commentActions';

class CommentForm extends Component {
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
        const { postId } = this.props;

        const newComment = {
            content: this.state.content,
            idStory: postId
        };

        this.props.createComment(newComment);
        this.setState({ content: '' })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <div className="comment_box">
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Bình luận bài viết" name="content" value={this.state.content} onChange={this.onChange} />
                    <button type="submit">Gửi</button>
                </form>
            </div>
        )
    }
}
CommentForm.propTypes = {
    createComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { createComment })(CommentForm);
