import { useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import "./Messenger.scss";
import { io } from "socket.io-client";
import axios from "axios";

export default function Messenger() {
  //Mock data including currentUser
  const currentUser = {
    _id: "655c8afe9f5ae05cb5fc89fb",
    username: "LuuQuocNhat",
    role: "talent",
    avatar:
      "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png",
    country: "Vietnam",
    rating: 5,
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVjOGFmZTlmNWFlMDVjYjVmYzg5ZmIiLCJpYXQiOjE3MDIwMzc3MzYsImV4cCI6MTcwMjEyNDEzNn0.rrh6yra0PdLi3tY5ZdNQWeVlB8pCs_LEOLqA0gMpXdY",
  };
  
  //Code
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  let [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  
  //Socket Initialization
  const socket = useRef(null);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    
    //Get message from server
    socket.current.on("getMessage", (data) => {
      setArrivalMessage = {
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      };
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current?.on("getUsers", (users) => {});
  }, [currentUser]);
  //Fetch conversations of currentUser
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/conversations/" + currentUser._id
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [currentUser._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: currentUser._id,
      text: newMessage,
    };

    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      content: newMessage,
    });
    try {
      const res = await axios.post("http://localhost:3000/messages", message);
      setMessages([...messages, res.data]);
    } catch (error) {
      console.log(error);
    }
    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );
    setNewMessage("");
    console.log(receiverId);
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const res = await axios.get(
            "http://localhost:3000/messages/" + currentChat?._id
          );
          setMessages(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <input placeholder="Search for artists" />
        {conversations.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => setCurrentChat(conversation)}
          >
            <Conversation
              conversation={conversation}
              currentUser={currentUser}
            />
          </div>
        ))}
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((message) => (
                  <div key={message._id} ref={scrollRef}>
                    <Message
                      message={message}
                      own={message.sender === currentUser._id}
                    />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  placeholder="Write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button onClick={handleSubmit}>Send</button>
              </div>
            </>
          ) : (
            <span className="noneChat">Open a conversation to chat </span>
          )}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline />
        </div>
      </div>
    </div>
  );
}
