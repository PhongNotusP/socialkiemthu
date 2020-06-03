import React, { Component } from "react";
import { Link } from "react-router-dom";
class Sidebar extends Component {
  render() {
    return (
      <div className="col-lg-6">
        <div className="cmp-info">
          <div className="cm-logo">
            <img
              src="https://res.cloudinary.com/dyogxjwr7/image/upload/v1591150851/social/logo.jpg"
              alt=""
            />
            <p>
              Chào mừng bạn đến mạng xã hội học tập nơi giao lưu, chia sẻ những
              kinh nghiệm, tài liệu và những công việc cho mọi người.
            </p>
          </div>
          <img
            src="https://res.cloudinary.com/dyogxjwr7/image/upload/v1591150851/social/cm-main-img.png"
            alt=""
          />
        </div>
      </div>
    );
  }
}
export default Sidebar;
