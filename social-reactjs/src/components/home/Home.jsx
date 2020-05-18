import React, { Component } from "react";
import Profile from "./Profile";
import { getUserHandle } from "../../actions/profileActions";
import { createPost, getPosts } from "../../actions/postActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Feed from "./Feed";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      content: this.state.content,
    };
    this.props.createPost(data);
    this.setState({
      content: "",
    });
  }

  componentDidMount() {
    this.props.getUserHandle();
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { handle } = this.props.profile;
    const { posts, loading } = this.props.post;
    const { errors } = this.state;
    let handleLoading;
    let postLoading;
    if (!handle) {
      handleLoading = <Spinner />;
    } else {
      handleLoading = (
        <div className="post-topbar">
          <div className="user-picy">
            <img
              style={{ marginTop: "10px" }}
              src={handle.user.avatar}
              alt={handle.user.name}
            />
          </div>
          <div className="search-bar">
            <form style={{ border: "solid 1px grey" }}>
              <input
                type="text"
                name="content"
                placeholder="Đăng new feed."
                onChange={this.onChange}
                value={this.state.content}
                style={{ marginBottom: "50px" }}
              />
              <p className="text-danger">{errors.content}</p>
            </form>
            <div className="post-st">
              <ul>
                <li>
                  <a
                    className="post_project"
                    onClick={this.onSubmit}
                    href="#!"
                    type="submit"
                  >
                    Đăng bài viết
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
    if (!loading) {
      postLoading = <Feed posts={posts} />;
    } else {
      postLoading = <Spinner />;
    }

    return (
      <div>
        <main>
          <div className="main-section">
            <div className="container">
              <div className="main-section-data">
                <div className="row">
                  <div className="col-lg-3 col-md-4 pd-left-none no-pd">
                    <div className="main-left-sidebar no-margin">
                      <Profile handle={handle} />
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8 no-pd">
                    <div className="main-ws-sec">
                      {handleLoading}
                      <div className="posts-section">{postLoading}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
Home.propTypes = {
  getUserHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
  post: state.post,
});
export default connect(mapStateToProps, {
  getUserHandle,
  createPost,
  getPosts,
})(Home);
