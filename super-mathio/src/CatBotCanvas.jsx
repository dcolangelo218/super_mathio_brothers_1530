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
const CatBotCanvas = ({ returnToMap }) => { 

    // Load the canvas reference objects and assign the initial states:
    const [messages, setMessages] = useState([
        { role: "system", content: "You are CatBot!" }]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // Pre-Load ALL images:
    // CODE

    /**
     * Where the conversation between the player and CatBot is handled.
     * @returns Returns the responses of CatBot
     */
    const handleConversation = async () => {

        // If the input cannot be trimmed or does not exist, simply return:
        if (!input.trim()) return;

        // Set a constant to track the player's message to CatBot:
        const newMessages = [...messages, { role: "user", content: input }];
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
            //console.log("OpenAI response error:", data);
            const aiReply = data.choices[0].message;
      
            // If a response isnt able to be loaded, indicate that no message was returned:
            if (!aiReply || !aiReply.content) {
                console.error("CatBot returned no message:", data);
                setMessages(prev => [...prev, { role: "assistant", content: "[CatBot was too sleepy to reply! 🐱💤]" }]);
                return;
            }
            
            // Update messages with the new response:
            setMessages(prev => [...prev, aiReply]);

        } 
        // If the AI's response cannot be fetched, throw an error:
        catch (err) {
            console.error("Failed to fetch CatBot's response:", err);
            setMessages(prev => [...prev, { role: "assistant", content: "It seems that CatBot is currently out of power...!" }]);
            return;
        } 
        // When the interaction is complete, set loading to false:
        finally {
            setLoading(false);
        }

    };

    // Return the current canvas and any buttons
    return(
        <div className="catbot-container">
            {/* Return Button */}
            <button
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    zIndex: 10,
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    backgroundColor: "#444",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}
                onClick={returnToMap} 
                > ⬅ Back to Map
            </button>

            {/* Chatbox and Chatbox Buttons */}
            <div className="chat-box">
                {messages.slice(1).map((msg, i) => (
                    <div key={i} className={`message ${msg.role === "user" ? "player" : ""}`}>
                    <strong>{msg.role === "user" ? "You" : "CatBot"}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div className="input-bar">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleConversation()}
                    placeholder="Ask CatBot something..."
                />
                <button onClick={handleConversation} disabled={loading}>
                    {loading ? "..." : "Send"}
                </button>
            </div>
        </div>
    );

};

export default CatBotCanvas;