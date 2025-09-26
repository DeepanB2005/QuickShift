import React, { useState, useRef } from "react";

const ChatBot = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatDisplay = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "You", text: input.trim() };
    setMessages(msgs => [...msgs, userMsg]);
    setInput("");

    // Show user message and call OpenAI API (replace key!)
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_OPENAI_API_KEY', // <-- Replace this!
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userMsg.text }]
        })
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't reply.";
      setMessages(msgs => [...msgs, { sender: "Bot", text: reply }]);
    } catch {
      setMessages(msgs => [...msgs, { sender: "Bot", text: "Sorry, there was an error." }]);
    }
    // Scroll to bottom
    setTimeout(() => {
      if (chatDisplay.current) chatDisplay.current.scrollTop = chatDisplay.current.scrollHeight;
    }, 100);
  };

  return (
    <>
      <div style={{
        position: 'fixed', bottom: 20, right: 20, width: 350, background: '#fff',
        border: '1px solid #999', borderRadius: 10, fontFamily: 'Arial', overflow: 'hidden',
        display: visible ? 'block' : 'none', zIndex: 1000
      }}>
        <div style={{ background: "#333", color: "#fff", padding: 10 }}>
          Chat with Us
          <span style={{ float: "right", cursor: "pointer" }} onClick={() => setVisible(false)}>X</span>
        </div>
        <div ref={chatDisplay} style={{ height: 300, overflowY: 'scroll', padding: 10, background: '#fafafa' }}>
          {messages.map((m, i) => (
            <div key={i}><strong>{m.sender}:</strong> {m.text}</div>
          ))}
        </div>
        <div style={{ padding: 10 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => { if (e.key === "Enter") sendMessage(); }}
            placeholder="Type here..." style={{ width: "75%" }} />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
      <button
        style={{ position: "fixed", bottom: 20, right: 20, zIndex: 999, display: visible ? 'none' : "block" }}
        onClick={() => setVisible(true)}
      >Chat</button>
    </>
  );
};

export default ChatBot;
