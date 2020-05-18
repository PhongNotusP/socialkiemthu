import React, { Component } from 'react';
import Profile from './Profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGuestProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
class GuestFeed extends Component {
    componentDidMount() {
        this.props.getGuestProfile(this.props.match.params.id);
    }
    render() {
        const { profile } = this.props.profile;
        let profileUser;
        if (!profile) {
            profileUser = <Spinner />
        } else {
            profileUser = (
                <Profile profile={profile} />
            )
        }
        return (
            <div>
                {profileUser}
            </div>
        )
    }
}
GuestFeed.propTypes = {
    getGuestProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
});
export default connect(mapStateToProps, { getGuestProfile })(GuestFeed);
