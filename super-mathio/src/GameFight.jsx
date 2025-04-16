/**
 * Import needed files/libraries/ect.
 * These allow us to use effects and update the state.
 */
import { useEffect, useRef, useState } from "react";
import "./GameFight.css";

/**
 * Where the game is displayed.
 * 
 * @returns The updated canvas based on it's state.
 */
const GameFight = () => {

    // Load the canvas reference objects and assign the initial screen state:
    const uiCanvasRef = useRef(null); // UI Canvas
    const bgCanvasRef = useRef(null); // Background Canvas
    const mgCanvasRef = useRef(null); // Middle ground canvas (not UI asset, not default background)
    const currentMusicRef = useRef(null) // References the current music playing
    const [isMuted, setIsMuted] = useState(true); // Tracks the state of the mute button; Note that the state will somehow have to carry over from GameCanvas

    // Pre-Loading images:
    const backgroundImage = new Image();
    backgroundImage.src = "/World 1.png";
    const playerImage = new Image();
    playerImage.src = "/PlayerImage.png";
    /*
    const enemyImage = new Image();
    enemyImage.src = "/[IMG NAME HERE].png";
    */

    //Should run on initial render
    useEffect(() => {
        // Sets the background canvas and it's attributes:
        const bgCanvas = bgCanvasRef.current;
        const bgCtx = bgCanvas.getContext("2d");
        bgCanvas.width = 1920; //NOTE THE LEVEL BACKGROUNDS ARE NOT 1920 X 1080, FIGURE OUT WHAT TO SET THIS AND THE CSS FILE TO
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

    //Return current canvases:
    return(
        <div className = "canvas-container">
            {/* Background Canvas (always drawn) */}
            <canvas ref={bgCanvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }} />
            {/* Middle Ground Canvas (Only Updates Middle Ground elements) */}
            <canvas ref={mgCanvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }} />
            {/* UI Canvas (Only Updates UI elements) */}
            <canvas ref={uiCanvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 3 }} />
        </div>
    );
};

export default GameFight;