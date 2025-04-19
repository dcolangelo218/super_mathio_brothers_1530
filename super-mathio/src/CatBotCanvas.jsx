/**
 * Import needed files/libraries/ect.
 * These allow us to use effects and update the state.
 */
import { useEffect, useRef, useState } from "react";
import "./GameCanvas.css";
import "./TitleAndWorldCanvas.jsx";

/**
 * Where the Cat Bot Lesson Canvas is displayed.
 * 
 * @returns The updated canvas based on it's state.
 */
const CatBotCanvas = () => { 

    // Load the canvas reference objects and assign the initial states:
    const [messages, setMessages] = useState([
        { role: "catbot", content: "You are CatBot!" }]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // Pre-Load ALL images:
    // CODE

    /**
     * Where the conversation between the player and CatBot is handled.
     * @returns 
     */
    const handleConversation = async () => {

        // If the input cannot be trimmed or does not exist, simply return:
        if (!input.trim()) return;

        // Set a constant to track the player's message to CatBot:
        const newMessages = [...messages, { role: "player", content: input }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        // Try to fetch the ChatGPT AI and load the response:
        try {

            // The information for fetching the AI using the key:
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
              method: "POST",
              headers: {
                "Authorization": `Bearer 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`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: newMessages,
              }),
            });
      
            // The AI response and reply:
            const data = await response.json();
            const aiReply = data.choices[0].message;
      
            setMessages(prev => [...prev, aiReply]);

        } 
        // If the AI's response cannot be fetched, throw an error:
        catch (err) {
            console.error("Failed to fetch CatBot's response:", err);
        } 
        // When the interaction is complete, set loading to false:
        finally {
            setLoading(false);
        }

    };

    // Return the current canvas and any buttons
    return(<div style={styles.container}>
        <div style={styles.chatBox}>
          {messages.slice(1).map((msg, i) => (
            <div key={i} style={{ ...styles.message, alignSelf: msg.role === "player" ? "flex-end" : "flex-start" }}>
              <strong>{msg.role === "player" ? "You" : "CatBot"}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <div style={styles.inputBar}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleConversation()}
            placeholder="Ask CatBot something..."
          />
          <button onClick={handleConversation} disabled={loading} style={styles.button}>
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    );

};

/** 
 * Temp function to handle styling
 */
const styles = {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "#121212",
      color: "#eee",
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
    },
    chatBox: {
      flex: 1,
      overflowY: "auto",
      marginBottom: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    inputBar: {
      display: "flex",
      gap: "0.5rem",
    },
    input: {
      flex: 1,
      padding: "0.5rem",
      fontSize: "1rem",
      borderRadius: "8px",
      border: "1px solid #444",
    },
    button: {
      padding: "0.5rem 1rem",
      fontSize: "1rem",
      backgroundColor: "#333",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
    message: {
      background: "#1e1e1e",
      padding: "0.5rem 1rem",
      borderRadius: "12px",
      maxWidth: "70%",
    },
  };

export default CatBotCanvas;