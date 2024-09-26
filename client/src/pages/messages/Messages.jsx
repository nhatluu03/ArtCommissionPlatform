import React, { useEffect, useState } from "react";
import {format} from 'timeago.js'
import "./Messages.scss";
import axios from "axios";

export default function Message({ message, own }) {
  const [sender, setSender] = useState(null);
  useEffect(() => {
    const senderId = message?.sender;
    const getSender = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/users/?userId=" + senderId
        );
        setSender(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSender();
  }, [message]);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="top">
        <img src={sender?.avatar} />
        <p>{message?.text}</p>
      </div>
      <div className="bottom">{format(message?.createdAt)}</div>
    </div>
  );
}

