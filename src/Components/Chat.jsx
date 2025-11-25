import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../utils/socket";
import { useSelector } from "react-redux";

export const Chat = () => {
  const { toUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    // as soon as page loads, join the chat room
    socket.emit("joinChat", { toUserId });

    socket.on("receiveMessage", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket error:", err.message);
      navigate("/login");
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("connect_error");
    };
  }, [user, toUserId]);

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
      <div className="flex-1 overflow-scroll p-5">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
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
