import React, { Component } from 'react';
import Profile from './Profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
class ProfileFeed extends Component {
    componentDidMount() {
        this.props.getUserProfile();
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
ProfileFeed.propTypes = {
    getUserProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
});
export default connect(mapStateToProps, { getUserProfile })(ProfileFeed);
