import React, { Component } from 'react'
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputForm from '../form/InputForm';
import { getUserProfile, updateUserSocial } from '../../actions/profileActions';
import isEmpty from '../../utils/isEmpty';
class Social extends Component {
    constructor() {
        super();
        this.state = {
            youtube: '',
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: '',
            global: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        this.props.getUserProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        if (nextProps.profile.profile) {
            if (!isEmpty(nextProps.profile.profile.social)) {
                const profile = nextProps.profile.profile.social;
                profile.youtube = !isEmpty(profile.youtube) ? profile.youtube : '';
                profile.facebook = !isEmpty(profile.facebook) ? profile.facebook : '';
                profile.twitter = !isEmpty(profile.twitter) ? profile.twitter : '';
                profile.linkedin = !isEmpty(profile.linkedin) ? profile.linkedin : '';
                profile.instagram = !isEmpty(profile.instagram) ? profile.instagram : '';
                profile.global = !isEmpty(profile.global) ? profile.global : '';
                this.setState({
                    youtube: profile.youtube,
                    facebook: profile.facebook,
                    twitter: profile.twitter,
                    linkedin: profile.linkedin,
                    instagram: profile.instagram,
                    global: profile.global
                });
            }
        }
    }
    onSubmit(e) {
        e.preventDefault();

        const userData = {
            youtube: this.state.youtube,
            facebook: this.state.facebook,
            twitter: this.state.twitter,
            linkedin: this.state.linkedin,
            instagram: this.state.instagram,
            global: this.state.global
        }

        this.props.updateUserSocial(userData);
    }
    render() {
        const { errors } = this.state;
        const { loading } = this.props.profile;
        let submitLoading;
        if (loading) {
            submitLoading = <Spinner />
        } else {
            submitLoading = (
                <div className="save-stngs pd2">
                    <ul>
                        <li><button type="submit">Cập nhật</button></li>
                    </ul>
                </div>
            )
        }
        return (
            <div className="acc-setting">
                <h3>Thêm mạng xã hội</h3>
                <form onSubmit={this.onSubmit}>
                    <InputForm
                        label="Youtube"
                        name="youtube"
                        placeholder="Youtube"
                        icon="fa fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    <InputForm
                        label="Facebook"
                        name="facebook"
                        placeholder="Facebook"
                        icon="fa fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputForm
                        label="Twitter"
                        name="twitter"
                        placeholder="Twitter"
                        icon="fa fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputForm
                        label="Linkedin"
                        name="linkedin"
                        placeholder="Linkedin"
                        icon="fa fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputForm
                        label="Instagram"
                        name="instagram"
                        placeholder="Instagram"
                        icon="fa fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                    <InputForm
                        label="Website cá nhân"
                        name="global"
                        placeholder="Website cá nhân"
                        icon="fa fa-globe"
                        value={this.state.global}
                        onChange={this.onChange}
                        error={errors.global}
                    />
                    {submitLoading}
                </form>
            </div>
        )
    }
}
Social.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getUserProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});
export default connect(mapStateToProps, { getUserProfile, updateUserSocial })(Social);