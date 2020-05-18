import React, { Component } from 'react'
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputForm from '../form/InputForm';
import SelectForm from '../form/SelectForm';
import TextareaForm from '../form/TextareaForm';
import { getUserProfile, updateUserProfile } from '../../actions/profileActions';
import isEmpty from '../../utils/isEmpty';
class Information extends Component {
    constructor() {
        super();
        this.state = {
            status: '',
            bio: '',
            skills: '',
            githubusername: '',
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
            const profile = nextProps.profile.profile;
            const skillsCSV = profile.skills.join(',');
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.status = !isEmpty(profile.status) ? profile.status : '';
            this.setState({
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio
            })
        }
    }
    onSubmit(e) {
        e.preventDefault();

        const userData = {
            status: this.state.status,
            bio: this.state.bio,
            skills: this.state.skills,
            githubusername: this.state.githubusername
        }

        this.props.updateUserProfile(userData);
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
        const options = [
            { label: "* Chuyên môn", value: 0 },
            { label: "Developer", value: 'Developer' },
            { label: "Junior Developer", value: 'Junior Developer' },
            { label: "Senior Developer", value: 'Senior Developer' },
            { label: "Manager", value: 'Manager' },
            { label: "Student or Learning", value: 'Student or Learning' },
            { label: "Intern", value: 'Intern' },
            { label: "Other", value: 'Other' },
        ];
        return (
            <div className="acc-setting">
                <h3>Thông tin</h3>
                <form onSubmit={this.onSubmit}>
                    <TextareaForm
                        label="Giới thiệu bản thân"
                        name="bio"
                        value={this.state.bio}
                        onChange={this.onChange}
                        error={errors.bio}
                    />
                    <SelectForm
                        label="Chuyên môn"
                        name="status"
                        icon="fa fa-user"
                        value={this.state.status}
                        onChange={this.onChange}
                        error={errors.status}
                        options={options}
                    />
                    <InputForm
                        label="Kĩ năng (dùng giấu , để ngắt tag)"
                        name="skills"
                        placeholder="Kĩ năng lập trình"
                        icon="fa fa-plane"
                        value={this.state.skills}
                        onChange={this.onChange}
                        error={errors.skills}
                    />
                    <InputForm
                        label="Tài khoản Github"
                        name="githubusername"
                        placeholder="Github"
                        icon="fa fa-lock"
                        value={this.state.githubusername}
                        onChange={this.onChange}
                        error={errors.githubusername}
                    />
                    {submitLoading}
                </form>
            </div>
        )
    }
}
Information.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getUserProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});
export default connect(mapStateToProps, { getUserProfile, updateUserProfile })(Information);