import { useState, useRef, useEffect } from "react";
import { useDummyWebSocket } from "../hooks/useDummyWebSocket";
import "../styles/main.scss";

export default function DummyChat() {
  const { messages, sendMessage } = useDummyWebSocket(5000);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);  // mesaj yazınca scroll yapması içins

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});   // daha yumuşak scroll için smooth kullandım
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div
      className={`dummy-chat-container ${isOpen ? "open" : "closed"}`}
    >
      {/* Aç-kapa butonu */}
      <div
        className="dummy-chat-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖️" : "💬"}
      </div>

      {isOpen && (
        <div className="dummy-chat-content">
          {/* Mesaj listesi */}
          <div className="dummy-chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.from === "user" ? "user" : "server"}`}
              >
                <p>
                  <strong>{msg.from}</strong> {msg.text}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input ve Gönder */}
          <div className="dummy-chat-input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSend}>Gönder</button>
          </div>
        </div>
      )}
    </div>
  );
}
