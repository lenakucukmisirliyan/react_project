import { useState } from "react";
import { useDummyWebSocket } from "../hooks/useDummyWebSocket";

export default function DummyChat() {
  const { messages, sendMessage } = useDummyWebSocket(5000); // 5 saniyede bir dummy
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: isOpen ? 300 : 50,
        height: isOpen ? 400 : 50,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        zIndex: 9999,
      }}
    >
      {/* Aç-kapa butonu */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#007bff",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {isOpen ? "✖️" : "💬"}
      </div>

      {isOpen && (
        <div
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "column",
            height: "calc(100% - 50px)",
          }}
        >
          {/* Mesaj listesi */}
          <div style={{ flex: 1, overflowY: "auto", marginBottom: 8 }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{ textAlign: msg.from === "user" ? "right" : "left" }}
              >
                <p style={{ margin: 4 }}>
                  <strong>{msg.from}</strong> {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Giriş ve Gönder */}
          <div style={{ display: "flex" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, marginRight: 4 }}
            />
            <button onClick={handleSend} style={{ backgroundColor:"#ffc107" }}>Gönder</button>
          </div>
        </div>
      )}
    </div>
  );
}
