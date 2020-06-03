import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "../form/LoginForm";
import Sidebar from "./Sidebar";
import { registerUser } from "../../actions/authActions";
import Spinner from "../common/Spinner";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/");
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      this.props.auth.loading = false;
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(userData);
  }
  render() {
    const { errors } = this.state;
    const { loading } = this.props.auth;
    let loginLoading;
    if (loading) {
      loginLoading = <Spinner />;
    } else {
      loginLoading = (
        <div className="col-lg-12 no-pdd">
          <button type="submit" value="submit">
            Đăng ký
          </button>
        </div>
      );
    }
    return (
      <div className="sign_in_sec" id="tab-2">
        <h3>Đăng ký</h3>
        <div className="dff-tab current" id="tab-3">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-lg-12 no-pdd">
                <div className="sn-field">
                  <LoginForm
                    label="Họ và tên"
                    name="name"
                    type="text"
                    placeholder="Họ và tên"
                    icon="fa fa-users"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                </div>
              </div>
              <div className="col-lg-12 no-pdd">
                <div className="sn-field">
                  <LoginForm
                    label="E-mail"
                    name="email"
                    type="email"
                    placeholder="E-mail tài khoản"
                    icon="fa fa-user"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                </div>
              </div>
              <div className="col-lg-12 no-pdd">
                <div className="sn-field">
                  <LoginForm
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    placeholder="Mật khẩu tài khoản"
                    icon="fa fa-lock"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                </div>
              </div>

              <div className="col-lg-12 no-pdd">
                <div className="sn-field">
                  <LoginForm
                    label="Nhập lại mật khẩu"
                    name="password2"
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    icon="fa fa-lock"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                </div>
              </div>
            </div>
            {loginLoading}
          </form>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(Register);
