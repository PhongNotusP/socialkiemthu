import React from "react";
import PropTypes from "prop-types";

const SubmitDoc = ({ title, link, des }) => {
  return (
    <div className="widget widget-adver">
      <div className="suggestion-usd">
        <div className="sgt-text">
          <div className="sign_in_sec current animated fadeIn" id="tab-1">
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "500",
                paddingBottom: "25px",
                marginLeft: "20px",
              }}
            >
              Thêm bài viết
            </h1>
            <form>
              <div className="row">
                <div
                  className="col-lg-12 no-pdd"
                  style={{ transform: "translate(-35px, 5px)" }}
                >
                  <div className="sn-field">
                    <input
                      type="text"
                      name={title}
                      placeholder="Title"
                      style={{ width: "150%" }}
                      // onChange={(event) => this.isInputChange(event)}
                    />
                    <i className="la la-dropbox" />
                  </div>
                </div>
                <div
                  className="col-lg-12 no-pdd"
                  style={{ transform: "translate(-35px, 10px)" }}
                >
                  <div className="sn-field">
                    <input
                      type="text"
                      name={link}
                      placeholder="Link"
                      style={{ width: "150%" }}
                      // onChange={(event) => this.isInputChange(event)}
                    />
                    <i className="la la-dropbox" />
                  </div>
                </div>
                <div
                  className="col-lg-12 no-pdd"
                  style={{ transform: "translate(-35px, 10px)" }}
                >
                  <div className="sn-field">
                    <input
                      type="text"
                      name={des}
                      placeholder="Description"
                      style={{ width: "150%" }}
                      // onChange={(event) => this.isInputChange(event)}
                    />
                    <i className="la la-dropbox" />
                  </div>
                </div>

                <div className="col-lg-12 no-pdd">
                  <button
                    type="submit"
                    value="submit"
                    style={{ marginLeft: "35px" }}
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
SubmitDoc.PropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};
export default SubmitDoc;
