// Components
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Conversations from "./components/Conversations/Conversations";
import { Outlet } from "react-router-dom";
import Talent from "./pages/talent/Talent";
import { io } from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/user.context";


export default function Layout ({ showSidebar, talent }) {
  const { user, login, logout } = useContext(UserContext);
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io("http://localhost:8900"));
  }, []);

  useEffect(() => {
    if(user){
      socket?.emit("addUser", user._id);
    }
  }, [socket, user]);

  return (
    <div
      className={`app ${showSidebar ? "with-sidebar" : "without-sidebar"}`}
    >
      <Navbar socketNavbar = {socket} />
      <Conversations socketConversation = {socket} />
      {showSidebar ? <Talent/> : <Outlet />}
    </div>
  );
};