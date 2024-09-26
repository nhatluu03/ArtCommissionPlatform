import { useState, useEffect, useContext, useRef } from "react";
import "./Conversations.scss";
import axios from "axios";
import { UserContext } from "../../contexts/user.context.jsx";
import Message from "../../pages/messages/Messages";
import { Conversation } from "../conversation/Conversation";
import { io } from "socket.io-client";


export default function Conversations({ socketConversation }) {
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isOpenConversations, SetIsOpenConversations] = useState(false);
  let [arrivalMessage, setArrivalMessage] = useState(null);
  const { user } = useContext(UserContext);
  const scrollRef = useRef();

  //Socket Initialization
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    
    //Get message from server
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        content: data.content,
        createdAt: Date.now(),
      });
      console.log('3')

    });
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      // If arrival message is in the current Conversation
      if (conversation?.otherMember.userId === arrivalMessage.senderId) {
        setConversation((prevConversation) => ({
          ...prevConversation,
          messages: [...prevConversation.messages, arrivalMessage],
          lastMessage: arrivalMessage, // Update the lastMessage with the new message
        }));
      }
  
      // const fetchConversation = async () => {
      //   try {
      //     if (currentChat && user && user._id) {
      //       const res = await axios.get(
      //         `http://localhost:3000/conversations/${currentChat}?userId=${user._id}`
      //       );
      //       setConversation((prevConversation) => ({
      //         ...prevConversation,
      //         messages: [...prevConversation.messages, arrivalMessage],
      //         lastMessage: arrivalMessage, // Update the lastMessage with the new message
      //       }));
      //       console.log('7')
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };
      // fetchConversation();
    }
  }, [arrivalMessage]);
  
  
  
  //Handle users in a conversation with socket
  useEffect(() => {
    if(user){
      socket.current.emit("addUser", user._id);
      socket.current?.on("getUsers", (users) => {});
      console.log('5')
    }
  }, [user]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if (user && user._id) {
          const userId = user._id;
          const response = await axios.get(
            `http://localhost:3000/conversations/user/${userId}`
          );
          setConversations(response.data);
          console.log('6')
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversations();
  }, [isOpenConversations]);

  //Get Messages
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        if (currentChat && user && user._id) {
          const res = await axios.get(
            `http://localhost:3000/conversations/${currentChat}?userId=${user._id}`
          );
          setConversation(res.data);
          console.log('7')
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversation();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: user._id,
      content: newMessage,
    };
    const receiverId = conversation?.otherMember.userId
    console.log('1')
    console.log(receiverId)

    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      content: newMessage,
    });

    try {
      const res = await axios.put(
        `http://localhost:3000/conversations/${currentChat}?userId=${user._id}`,
        message,{
          withCredentials: true
        }
      );
      setConversation(res.data);
      console.log('2')
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);
  console.log(socket)
  return (
    <div className="conversations">
      <button
        className="open-conversations-btn"
        onClick={() => {
          SetIsOpenConversations(!isOpenConversations);
        }}
      >
        Open conversations
      </button>

      {/* {
        "_id": "6586e9f066e3e33b00b4189f",
        "otherMember": {
            "userId": "658062207c52175e9fb6c2ce",
            "username": "talentUser1",
            "avatar": "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
        },
        "lastMessage": {
            "senderId": "6586a99657c844a8dca8ea73",
            "content": "This is a newwwww msg",
            "reactions": ""
        }
    }, */}

      {isOpenConversations && (
        <div className="conversations-content">
          <div className="conversation-header">
            <h3 className="conversation-header__title">Conversations</h3>
            <button
              className="close-modal-ic"
              onClick={() => {
                SetIsOpenConversations(false);
              }}
            >
              close
            </button>
          </div>

          <div className="conversation-container">
            {conversations.map((conversation, index) => (
              <div
                className="conversation-item"
                key={index}
                onClick={() => setCurrentChat(conversation._id)}
              >
                <img
                  src={conversation.otherMember.avatar}
                  alt=""
                  className="conversation-item__avt"
                />
                <div className="conversation-item__info">
                  <p className="conversation-item__info__fullname">
                    {conversation.otherMember.username}
                  </p>
                  <p className="conversation-item__info__last-msg">
                    {conversation.lastMessage?.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="conversation-item">
              <img
                src="data:image/png;base64,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"
                alt=""
                className="conversation-item__avt"
              />
              <div className="conversation-item__info">
                <p className="conversation-item__info__fullname">Ellena</p>
                <p className="conversation-item__info__last-msg">
                  Lorem Ipsum is simply in ...
                </p>
              </div>
            </div>
            <div className="conversation-item">
              <img
                src="data:image/png;base64,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"
                alt=""
                className="conversation-item__avt"
              />
              <div className="conversation-item__info">
                <p className="conversation-item__info__fullname">Ellena</p>
                <p className="conversation-item__info__last-msg">
                  Lorem Ipsum is simply in ...
                </p>
              </div>
            </div>
            <div className="conversation-item">
              <img
                src="data:image/png;base64,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"
                alt=""
                className="conversation-item__avt"
              />
              <div className="conversation-item__info">
                <p className="conversation-item__info__fullname">Ellena</p>
                <p className="conversation-item__info__last-msg">
                  Lorem Ipsum is simply in ...
                </p>
              </div>
            </div>
          </div> */}

          <div className="conversation-details">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  <div>
                    <Conversation conversation={conversation} />
                  </div>
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
              <>
                <img
                  src="https://webaffiliatevn.com/wp-content/uploads/2020/08/IMGLOGO_Primary_CMYK_Blue_Rel_webready.jpg"
                  alt=""
                  className="conversation-details__bg"
                />
                <h4>Welcome to ArtHub Chat</h4>
                <hr />
                <p>Choose a conversation to start.</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
