import React, { Component } from 'react'
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputForm from '../form/InputForm';
import CheckboxForm from '../form/CheckboxForm';
import TextareaForm from '../form/TextareaForm';
import { getUserProfile, createUserExperience, removeUserExperience } from '../../actions/profileActions';
import Moment from 'react-moment';
class Experience extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            company: '',
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
            title: this.state.title,
            company: this.state.company,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }
        this.props.createUserExperience(userData);
        this.setState({
            title: '',
            company: '',
            from: '',
            to: '',
            current: false,
            description: ''
        });
    }
    onDeleteClick(id) {
        if (window.confirm('Bạn có chắc chắn xóa ?')) {
            this.props.removeUserExperience(id);
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
                        <li><button type="submit">Thêm kinh nghiệm</button></li>
                    </ul>
                </div>
            )
        }
        let expData;
        if (profile) {
            expData = profile.experience.map(exp => (
                <div className="notbar" key={exp._id}>
                    <h4>{exp.title} - {exp.company}</h4>
                    <h3><Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.current ? ('Hiện tại') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}</h3>
                    <p>{exp.description}</p>
                    <div className="toggle-btn">
                        <button onClick={this.onDeleteClick.bind(this, exp._id)} className="close-req"><i className="la la-close"></i></button>
                    </div>
                </div>
            ))
        }
        return (
            <div className="acc-setting">
                <h3>Kinh nghiệm</h3>
                {expData}
                <form onSubmit={this.onSubmit}>
                    <InputForm
                        label="Job"
                        name="title"
                        placeholder="Vị trí làm việc"
                        icon="fa fa-users"
                        value={this.state.title}
                        onChange={this.onChange}
                        error={errors.title}
                    />
                    <InputForm
                        label="Công ty"
                        name="company"
                        placeholder="Công ty làm việc"
                        icon="fa fa-coffee"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={errors.company}
                    />
                    <TextareaForm
                        label="Giới thiệu kinh nghiệm"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                        error={errors.description}
                    />
                    <InputForm
                        label="Làm từ"
                        name="from"
                        type="date"
                        icon="fa fa-calculator"
                        value={this.state.from}
                        onChange={this.onChange}
                        error={errors.from}
                    />
                    <InputForm
                        label="Cho tới"
                        name="to"
                        type="date"
                        icon="fa fa-calculator"
                        value={this.state.to}
                        onChange={this.onChange}
                        error={errors.to}
                        disabled={this.state.disabled ? 'disabled' : ''}
                    />
                    <CheckboxForm
                        label="Còn làm"
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
Experience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getUserProfile: PropTypes.func.isRequired,
    removeUserExperience: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});
export default connect(mapStateToProps, { getUserProfile, createUserExperience, removeUserExperience })(Experience);