import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FeedItem from './FeedItem'
import { connect } from 'react-redux';

class Feed extends Component {
    render() {
        const { posts } = this.props;
        return posts.map(post => <FeedItem key={post._id} post={post} />)
    }
}

Feed.propTypes = {
    posts: PropTypes.array.isRequired
}
const mapStateToProps = (state) => ({

});
export default connect(mapStateToProps, null)(Feed);