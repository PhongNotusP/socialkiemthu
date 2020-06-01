import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

function toggleEmojiPicker() {
  this.setState({
    showEmojiPicker: !this.state.showEmojiPicker,
  });
}
function addEmoji(emoji) {
  const { newMessage } = this.state;
  const text = `${newMessage}${emoji.native}`;

  this.setState({
    newMessage: text,
    showEmojiPicker: false,
  });
}
function sendMessage() {
  const { newMessage } = this.state;
  if (newMessage.trim() === "") return;
  this.setState({
    newMessage: "",
  });
}
export { addEmoji, toggleEmojiPicker, sendMessage };
