import React, { Component } from 'react'
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputForm from '../form/InputForm';
import CheckboxForm from '../form/CheckboxForm';
import TextareaForm from '../form/TextareaForm';
import { getUserProfile, createUserEducation, removeUserEducation } from '../../actions/profileActions';
import Moment from 'react-moment';
class Education extends Component {
    constructor() {
        super();
        this.state = {
            school: '',
            degree: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    }

    componentDidMount() {
        this.props.getUserProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }
    onSubmit(e) {
        e.preventDefault();

        const userData = {
            school: this.state.school,
            degree: this.state.degree,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }
        this.props.createUserEducation(userData);
        this.setState({
            school: '',
            degree: '',
            from: '',
            to: '',
            current: false,
            description: ''
        });
    }
    onDeleteClick(id) {
        if (window.confirm('Bạn có chắc chắn xóa ?')) {
            this.props.removeUserEducation(id);
        }
    }
    render() {
        const { errors } = this.state;
        const { loading, profile } = this.props.profile;
        let submitLoading;
        if (loading) {
            submitLoading = <Spinner />
        } else {
            submitLoading = (
                <div className="save-stngs pd2">
                    <ul>
                        <li><button type="submit">Thêm học vấn</button></li>
                    </ul>
                </div>
            )
        }
        let eduData;
        if (profile) {
            eduData = profile.education.map(edu => (
                <div className="notbar" key={edu._id}>
                    <h4>{edu.school} - {edu.degree}</h4>
                    <h3><Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.current ? ('Hiện tại') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}</h3>
                    <p>{edu.description}</p>
                    <div className="toggle-btn">
                        <button onClick={this.onDeleteClick.bind(this, edu._id)} className="close-req"><i className="la la-close"></i></button>
                    </div>
                </div>
            ))
        }
        return (
            <div className="acc-setting">
                <h3>Học vấn</h3>
                {eduData}
                <form onSubmit={this.onSubmit}>
                    <InputForm
                        label="Trường học"
                        name="school"
                        placeholder="Trường học"
                        icon="fa fa-users"
                        value={this.state.school}
                        onChange={this.onChange}
                        error={errors.school}
                    />
                    <InputForm
                        label="Khóa học"
                        name="degree"
                        placeholder="Khóa học"
                        icon="fa fa-coffee"
                        value={this.state.degree}
                        onChange={this.onChange}
                        error={errors.degree}
                    />
                    <TextareaForm
                        label="Giới thiệu khóa học"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                        error={errors.description}
                    />
                    <InputForm
                        label="Học từ"
                        name="from"
                        type="date"
                        icon="fa fa-calculator"
                        value={this.state.from}
                        onChange={this.onChange}
                        error={errors.from}
                    />
                    <InputForm
                        label="Học tới"
                        name="to"
                        type="date"
                        icon="fa fa-calculator"
                        value={this.state.to}
                        onChange={this.onChange}
                        error={errors.to}
                        disabled={this.state.disabled ? 'disabled' : ''}
                    />
                    <CheckboxForm
                        label="Còn học"
                        name="current"
                        value={this.state.current}
                        onChange={this.onCheck}
                        checked={this.state.current}
                        error={errors.current}
                    />
                    {submitLoading}
                </form>
            </div>
        )
    }
}
Education.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getUserProfile: PropTypes.func.isRequired,
    removeUserEducation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});
export default connect(mapStateToProps, { getUserProfile, createUserEducation, removeUserEducation })(Education);