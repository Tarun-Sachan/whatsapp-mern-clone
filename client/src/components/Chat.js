import React from "react";
import { useState } from "react";
import classes from "./Chat.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AttachFile, SearchOutlined } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import axios from "../axios";

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");
  const currTime = new Date().toLocaleTimeString();
  

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    await axios.post("/api/v1/messages/new", {
      message: input,
      name: "tarun",
      timestamp: currTime,
      received: false,
    });
    setInput("");
  };

  return (
    <div className={classes.chat}>
      <div className={classes.chat_header}>
        <Avatar />
        <div className={classes.chat_headerInfo}>
          <h3>Room Name</h3>
          <p>Last Seen at....</p>
        </div>
        <div className={classes.chat_headerRight}>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.chat_body}>
        {messages.map((message) => (
          <p
            className={` ${classes.chat_message}  ${
              message.received && classes.chat_reciever
            }`}
          >
            <span className={classes.chat_name}>{message.name}</span>
            {message.message}
            <span className={classes.chat_timestamp}>{message.timestamp}</span>
          </p>
        ))}
        {/* <p className={classes.chat_reciever}>
          <span className={classes.chat_name}>Tarun</span>
          This is a message
          <span className={classes.chat_timestamp}>
            {new Date().toUTCString()}
          </span>
        </p> */}
      </div>
      <div className={classes.chat_footer}>
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessageHandler} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
