import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import LoginForm from "../form/LoginForm";
import Sidebar from "./Sidebar";
import Spinner from "../common/Spinner";
import Recaptcha from "react-recaptcha";
class Login extends Component {
  constructor() {
    super();
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.capcha = this.capcha.bind(this);
    this.state = {
      email: "test@gmail.com",
      password: "tester123",
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
    if (this.state.isVerified) {
    } else {
      alert("Hãy xác thực không phải robot");
    }
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
        <div className="save-stngs pd2">
          <ul>
            <li>
              <button
                id="dangnhap"
                type="submit"
                onClick={() => {
                  this.handleSubscribe();
                }}
              >
                Đăng nhập
              </button>
              <Recaptcha
                sitekey="6Lcy__MUAAAAAEdFIyNp0jdNL51a7P42mENRD5is"
                render="explicit"
                verifyCallback={this.verifyCallback}
              />
            </li>
          </ul>
        </div>
      );
    }
    return (
      <section className="profile-account-setting">
        <div className="container">
          <div className="account-tabs-setting">
            <div className="row">
              <Sidebar />
              <div className="col-lg-9">
                <div className="tab-content">
                  <div className="acc-setting">
                    <h3 style={{ textAlign: "center" }}> Đăng nhập</h3>
                    <h3 style={{ textAlign: "center" }}>Tài khoản test</h3>
                    <p style={{ textAlign: "center" }}> </p>
                    <p style={{ textAlign: "center" }}></p>
                    <form onSubmit={this.onSubmit}>
                      <LoginForm
                        label="E-mail"
                        name="email"
                        placeholder="E-mail tài khoản"
                        icon="fa fa-user"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                      />
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
                      {loginLoading}
                    </form>
                    {/* <div
                      style={{ marginLeft: "220px" }}
                      class="g-recaptcha"
                      data-sitekey="6Lcy__MUAAAAAEdFIyNp0jdNL51a7P42mENRD5is"
                    ></div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
