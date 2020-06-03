import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactGiphySearchbox from "react-giphy-searchbox";
import { connect } from "react-redux";
import { postMessage } from "../../actions/messageActions";
import { Smile } from "react-feather";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { addEmoji, toggleEmojiPicker } from "./method";

class MessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      errors: {},
      showEmojiPicker: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addEmoji = addEmoji.bind(this);
    this.toggleEmojiPicker = toggleEmojiPicker.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const newMessage = {
      content: this.state.content,
      idRoom: this.props.room,
    };

    this.props.postMessage(newMessage);
    this.setState({ content: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { showEmojiPicker } = this.state;
    return (
      <div className="message-send-area">
        <form onSubmit={this.onSubmit}>
          <div className="mf-field">
            <input
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.onChange}
              placeholder="Type a message here"
            />

            <button type="submit">Send</button>
          </div>
          <button
            style={{ transform: "translate(520px, -32px)" }}
            type="button"
            className="toggle-emoji"
            onClick={this.toggleEmojiPicker}
          >
            <Smile />
            {showEmojiPicker ? (
              <Picker
                onSelect={this.addEmoji}
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                }}
              />
            ) : null}
          </button>
          {/* <div
            className="searchboxWrapper"
            style={{ transform: "translate(-18px, 0px)" }}
          >
            <ReactGiphySearchbox
              apiKey="6VPwrq3FOBNn0uz6KOGhC2jQpnrHRbEi"
              onSelect={(item) => console.log(item)}
              masonryConfig={[
                { columns: 3, imageWidth: 110, gutter: 5 },
                { mq: "700px", columns: 3, imageWidth: 120, gutter: 5 },
              ]}
            />
          </div> */}
          {/* <Picker
            onSelect={this.addEmoji}
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              transform: "translate(20px, 76px)",
            }}
          /> */}
        </form>
      </div>
    );
  }
}
MessageForm.propTypes = {
  postMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { postMessage })(MessageForm);
