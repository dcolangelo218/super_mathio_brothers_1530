/**
 * Import needed files/libraries/ect.
 * These allow us to use effects and update the state.
 */
import { useEffect, useRef, useState } from "react";
import "./GameCanvas.css";

/**
 * Where the game is displayed.
 * 
 * @returns The updated canvas based on it's state.
 */
const CombatCanvas = ({ returnToMap, toggleMute, isMuted, world, level, onLevelComplete}) => {

    // Load the canvas reference objects and assign the initial screen state:
    const uiCanvasRef = useRef(null); // UI Canvas
    const bgCanvasRef = useRef(null); // Background Canvas
    const mgCanvasRef = useRef(null); // Middle ground canvas (not UI asset, not default background)

    const [enemy, setEnemy] = useState(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [wrong, setWrong] = useState(false);
    const [dying, setDying] = useState(false);

    // Pre-Loading images:
    const world1Background = new Image();
    world1Background.src = "/World 1.png";
    const world2Background = new Image();
    world2Background.src = "/World 2.png";
    const world3Background = new Image();
    world3Background.src = "/World 3.png";
    const world4Background = new Image();
    world4Background.src = "/World 4.png";

    const playerImage = new Image();
    playerImage.src = "/PlayerImage.png";
    /*
    const enemyImage = new Image();
    enemyImage.src = "/[IMG NAME HERE].png";
    */

    const backgroundImage =
    world === 1 ? world1Background
    : world === 2 ? world2Background
    : world === 3 ? world3Background
    : world === 4 ? world4Background
    : world1Background;

    //Should run on initial render
    useEffect(() => {
        // Sets the background canvas and it's attributes:
        const bgCanvas = bgCanvasRef.current;
        const bgCtx = bgCanvas.getContext("2d");
        bgCanvas.width = 1920; //NOTE THE LEVEL BACKGROUNDS ARE NOT 1920 X 1080
        bgCanvas.height = 1080;

         // Sets the middle ground canvas and it's attributes:
        const mgCanvas = mgCanvasRef.current;
        const mgCtx = mgCanvas.getContext("2d");
        mgCanvas.width = 1920; //SAME AS ABOVE
        mgCanvas.height = 1080;

        // Sets the ui canvas and it's attributes:
        const uiCanvas = uiCanvasRef.current;
        const uiCtx = uiCanvas.getContext("2d");
        uiCanvas.width = 1920; //SAME AS ABOVE
        uiCanvas.height = 1080;

        // If the canvases were not loaded properly, return:
        if (!bgCanvas || !mgCanvas || !uiCanvas) {
            return;
        }

        // Loads the default background image to the background canvas:
        backgroundImage.onload = () => {
            bgCtx.drawImage(backgroundImage, 0, 0, bgCanvas.width, bgCanvas.height);
        }

        playerImage.onload = () => {
            mgCtx.drawImage(playerImage, 0, 0, 200, 200); //maybe replace width and height with something non-static(as in stored somewhere; technically still static) later
        }

        //add more visuals and some inputs here later

        
        //return things we dont need anymore here

    }, [])

    useEffect(() => {
        // fetch a question+png for this world/level
        fetch(`/api/enemy?world=${world}&level=${level}`)
          .then(res => res.json())
          .then(data => {
            setEnemy(data); // { question, answer, png }
          })
          .catch(console.error);
      }, [world, level]);
    
      // draw background & player once enemy is loaded
      useEffect(() => {
        if (!enemy) return;
        const bgCanvas = bgCanvasRef.current;
        const bgCtx = bgCanvas.getContext("2d");
        const mgCanvas = mgCanvasRef.current;
        const mgCtx = mgCanvas.getContext("2d");
        const img = new Image();
        img.src = EnemyPlaceholder.png;
        img.onload = () => {
          bgCanvas.width = mgCanvas.width = 1920;
          bgCanvas.height = mgCanvas.height = 1080;
          bgCtx.clearRect(0,0,1920,1080);
          bgCtx.drawImage(img, 760, 200);   // arbitrary pos
        };
      }, [enemy]);
    
      function handleSubmit(e) {
        e.preventDefault();
        if (userAnswer.trim().toLowerCase() === enemy.answer.trim().toLowerCase()) {
          setDying(true);
          setTimeout(() => {
            setDying(false);
            onLevelComplete();
          }, 1000);
        } else {
          setWrong(true);
        }
      }

    //Return current canvases:
    return(
        <div className = "canvas-container">
            {/* Background Canvas (always drawn) */}
            <canvas ref={bgCanvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }} />
            {/* Middle Ground Canvas (Only Updates Middle Ground elements) */}
            <canvas ref={mgCanvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }} />
            {/* UI Canvas (Only Updates UI elements) */}
            <canvas ref={uiCanvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 3 }} />

            <label>
                Fight back!
                <div className = "input-bar" style={{ zIndex: 4 }}>
                    <div className = "input-bar button" style = {{ position: "relative", top: 0, left: 1, zIndex: 4}} />
                    <div className = "input-bar input" />
                </div>
            </label>

             {/* Music Start Button */}
             <img
            src={isMuted ? "/isMuted.png" : "/isNotMuted.png"}
            alt={isMuted ? "Unmute" : "Mute"}
            onClick={toggleMute}
            style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            zIndex: 5,
            cursor: "pointer"
            }}
            />

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

            {/* Enemy UI */}
            <div style={{ position:"absolute", zIndex:3, top:0, left:0, width:"100%" }}>
                {enemy && !dying && (
                <div>
                    <p>Enemy asks: {enemy.question}</p>
                    <form onSubmit={handleSubmit}>
                    <input
                        value={userAnswer}
                        onChange={e => { setUserAnswer(e.target.value); setWrong(false); }}
                        placeholder="Your answer"
                    />
                    <button type="submit">Answer</button>
                    </form>
                    {wrong && <p style={{color:"red"}}>Incorrect, try again.</p>}
                </div>
                )}
                {dying && <p>Enemy defeated!</p>}
            </div>


        </div>
    );
};

export default CombatCanvas;