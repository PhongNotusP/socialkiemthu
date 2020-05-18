import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Friend from './Friend'
import { connect } from 'react-redux';

class Feed extends Component {
    render() {
        const { rooms, live } = this.props;
        return rooms.map(room => <Friend key={room._id} room={room} live={live} />)
    }
}

Feed.propTypes = {
    rooms: PropTypes.array.isRequired
}
const mapStateToProps = (state) => ({

});
export default connect(mapStateToProps, null)(Feed);