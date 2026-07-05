import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { personas } from "../Personas";
import "./Chat.css";
import { FiMoon, FiSun } from "react-icons/fi";
import hiteshSirImg from "../assets/HiteshSir.jpeg";
import piyushSirImg from "../assets/PiyushSir.jpeg";

function Chat({ theme, setTheme }) {
  const navigate = useNavigate();
  const { personaId } = useParams();

  const persona = personas[personaId];
  //console.log(persona);
  const personaImage =
  personaId === "HiteshSir"
    ? hiteshSirImg
    : piyushSirImg;

    const greetings = {
  HiteshSir:
    "Haan ji swagat h apka iss chat me, Kaahiye konsi samasya ka samadhan kerna h",

  PiyushSir:
    "Hey! 👋 What's on your mind today? Whether it's DSA, system design, JavaScript, or backend development, let's learn it together.",
};

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: greetings[personaId],
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = {
    role: "user",
    content: input.trim(),
  };

  // Create updated conversation
  const updatedMessages = [...messages, userMessage];

  // Show user message immediately
  setMessages(updatedMessages);

  // Clear input
  setInput("");

  try {
    // Ask the current persona for a reply
    const response = await persona.reply(updatedMessages);

    // Add AI response
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: response,
      },
    ]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "😅 Sorry, something went wrong.",
      },
    ]);
  }
};

  return (
    <div className="chat-page">

        <button
    className="theme-toggle floating-toggle"
    onClick={() =>
      setTheme(theme === "light" ? "dark" : "light")
    }
  >
    {theme === "light" ? <FiMoon /> : <FiSun />}
  </button>

      {/* Header */}
      <header className="chat-header">
        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        <h2 className="chat-title">{persona.name}</h2>

        

        {/* Empty div keeps title perfectly centered */}
        <div style={{ width: "60px" }} />
      </header>

      {/* Messages */}
      <div className="chat-body">
  <div className="chat-wrapper">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`message-row ${msg.role}`}
      >
        {msg.role === "assistant" && (
          <img
            src={personaImage}
            alt={persona.name}
            className="message-avatar"
          />
        )}

        <div className={`message ${msg.role}`}>
          {msg.content}
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Input */}
      <footer className="chat-footer">
        <div className="input-wrapper">
          <input
            className="chat-input"
            type="text"
            placeholder={`Message ${persona.name}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <button
            className="send-btn"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Chat;