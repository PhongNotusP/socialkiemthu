import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import LoginForm from "../form/LoginForm";
import Sidebar from "./Sidebar";
import Spinner from "../common/Spinner";
import Recaptcha from "react-recaptcha";
import Register from "./Register";
class Login extends Component {
  constructor() {
    super();
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.capcha = this.capcha.bind(this);
    this.state = {
      email: "",
      password: "",
      errors: {},
      isVerified: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

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
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  }

  handleSubscribe() {
    // if (this.state.isVerified) {
    // } else {
    //   alert("Hãy xác thực không phải robot");
    // }
  }
  capcha() {
    if (this.state.isVerifiedtrue) {
      document.getElementById("dangnhap").disabled = false;
    } else {
      document.getElementById("dangnhap").disabled = true;
    }
  }
  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true,
      });
    }
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
          <button
            id="dangnhap"
            type="submit"
            onClick={() => {
              this.handleSubscribe();
            }}
          >
            Đăng nhập
          </button>
          {/* <Recaptcha
            sitekey="6Lcy__MUAAAAAEdFIyNp0jdNL51a7P42mENRD5is"
            render="explicit"
            verifyCallback={this.verifyCallback}
          /> */}
        </div>
      );
    }
    return (
      <div className="sign-in">
        <div className="wrapper" style={{ backgroundColor: "#d43535" }}>
          <div className="sign-in-page">
            <div className="signin-popup">
              <div className="signin-pop">
                <div className="row">
                  <Sidebar />
                  <div className="col-lg-6">
                    <div className="login-sec">
                      <ul className="sign-control">
                        <li data-tab="tab-1" className="current">
                          <a href="#" title="">
                            Đăng nhập
                          </a>
                        </li>
                        <li data-tab="tab-2">
                          <a href="#" title="">
                            Đăng ký
                          </a>
                        </li>
                      </ul>
                      <div className="sign_in_sec current" id="tab-1">
                        <h3>Đăng nhập</h3>
                        <form onSubmit={this.onSubmit}>
                          <div className="row">
                            <div className="col-lg-12 no-pdd">
                              <div className="sn-field">
                                <LoginForm
                                  label="E-mail"
                                  name="email"
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
                              <div className="checky-sec">
                                <div className="fgt-sec">
                                  <input type="checkbox" name="cc" id="c1" />
                                  <label>
                                    <span></span>
                                  </label>
                                  <small>Ghi nhớ</small>
                                </div>
                                <a href="#" title="">
                                  Quên mật khẩu?
                                </a>
                              </div>
                            </div>
                          </div>
                          {loginLoading}
                        </form>
                      </div>
                      <Register />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
