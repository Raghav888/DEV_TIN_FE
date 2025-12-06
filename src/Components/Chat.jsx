import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants/url";

export const Chat = () => {
  const { toUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(BASE_URL + `/chats/chat/${toUserId}`, {
        withCredentials: true,
      });
      const data = response.data?.messages.map((resp) => ({
        message: resp.text,
        fromUserId: resp.sender._id,
        firstName: resp.sender.firstName,
      }));
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    // Attach receiveMessage listener ONCE
    socket.on("receiveMessage", (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    });

    socket.on("connect_error", (err) => {
      navigate("/login");
    });

    //Wait for socket connection BEFORE joinChat
    socket.on("connect", () => {
      socket.emit("joinChat", { toUserId });
    });

    //Fetch old messages AFTER joinChat
    fetchMessages();

    // Cleanup
    return () => {
      socket.off("receiveMessage");
      socket.off("connect_error");
      socket.off("connect");
    };
  }, [toUserId]);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      toUserId,
      message: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 mt-10 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-y-auto flex flex-col-reverse p-5">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet.</p>
        ) : (
          [...messages].reverse().map((msg, index) => (
            <div
              key={index}
              className={
                msg.fromUserId === user?._id
                  ? "chat chat-end"
                  : "chat chat-start"
              }
            >
              <div className="chat-header">{msg.firstName}</div>
              <div className="chat-bubble">{msg.message}</div>
            </div>
          ))
        )}
      </div>
      <div className="p-5 border-t border-gray-600 flex gap-2">
        <input
          type="text"
          value={newMessage}
          placeholder="Type your message..."
          className="flex-1 border border-gray-600 text-white rounded p-2"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};
