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
const GameCanvas = () => {

    // Load the canvas reference objects and assign the initial screen state:
    const uiCanvasRef = useRef(null); // UI Canvas
    const bgCanvasRef = useRef(null); // Background Canvas
    const mgCanvasRef = useRef(null); // Middle ground canvas (not UI asset, not default background)
    const currentMusicRef = useRef(null) // References the current music playing
    const [screenState, setScreenState] = useState("Title"); // State will either be "Title" or "WorldMap"
    const [isMuted, setIsMuted] = useState(true); // Tracks the state of the mute button
    const [monitorsState, setMonitorsState] = useState("Algebraia"); // Algebraia, Statstrider, Calcomet, Physix

    // Pre-Load ALL images:
    const backgroundImage = new Image();
    backgroundImage.src = "/BlankBackground.png";
    const titleImage = new Image();
    titleImage.src = "/SuperMathioTitle.png";
    const mapImage = new Image();
    mapImage.src = "/WorldMap.png";

    const enterButton = new Image();
    enterButton.src = "/EnterButton.png";

    const topMonitor = new Image();
    topMonitor.src = "/TopMonitor.png";
    const bottomMonitor = new Image();
    bottomMonitor.src = "/BottomMonitor.png";
    const algebraiaLevels = new Image();
    algebraiaLevels.src = "/AlgebraiaLevels.png";
    const statstriderLevels = new Image();
    statstriderLevels.src = "/StatstriderLevels.png";
    const calcometLevels = new Image();
    calcometLevels.src = "/CalcometLevels.png";
    const physixLevels = new Image();
    physixLevels.src = "/PhysixLevels.png";

    // Define Variables for enterButton animation:
    let enterButScale = 1;
    let enterButDirection = 1;
    const enterButMinScale = 0.95;
    const enterButMaxScale = 1.05;
    const enterButScaleSpeed = 0.0025; // Controls how fast it pulses
    let animationFrameId;


    /**
     * A function that updates the main screen and allows us to fetch component data.
     */
    useEffect(() => {

        // Load needed tracks:
        let mainMusic = new Audio("/MainScreen-SpaceTravel.mp3");
        mainMusic.loop = true; // So that the track loops
        currentMusicRef.current = mainMusic;

        // Sets the background canvas and it's attributes:
        const bgCanvas = bgCanvasRef.current;
        const bgCtx = bgCanvas.getContext("2d");
        bgCanvas.width = 1920;
        bgCanvas.height = 1080;

        // Sets the middle ground canvas and it's attributes:
        const mgCanvas = mgCanvasRef.current;
        const mgCtx = mgCanvas.getContext("2d");
        mgCanvas.width = 1920;
        mgCanvas.height = 1080;

        // Sets the ui canvas and it's attributes:
        const uiCanvas = uiCanvasRef.current;
        const uiCtx = uiCanvas.getContext("2d");
        uiCanvas.width = 1920;
        uiCanvas.height = 1080;

        // If the canvases were not loaded properly, return:
        if (!bgCanvas || !mgCanvas || !uiCanvas) {
            return;
        }

        // Loads the default background image to the background canvas:
        backgroundImage.onload = () => {
            bgCtx.drawImage(backgroundImage, 0, 0, bgCanvas.width, bgCanvas.height);
        }

        // Draw the title screen to the middle ground canvas:
        titleImage.onload = () => {
            drawTitleScreen(mgCtx, mgCanvas);
        };

        // Loads the pulsing enter button on the title page:
        enterButton.onload = () => {
            animatePressEnter(uiCtx, uiCanvas);
        };

        // Create an event listener that indicates user input:
        window.addEventListener("keydown", handleKeyPress);

        // Remove the event listener when function completes:
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
            mainMusic.pause();
            mainMusic.currentTime = 0;
            mainMusic.src = "";
        }

    }, [])

    /**
     * When screenState changes, update the canvas(s).
     */
    useEffect(() => {

        // Set mgCanvas and mgCtx, if the canvas ref doesnt exist, return:
        const mgCanvas = mgCanvasRef.current;
        const uiCanvas = uiCanvasRef.current;
        if (!mgCanvas || !uiCanvas) {
            return;
        }
        const mgCtx = mgCanvas.getContext("2d");
        const uiCtx = uiCanvas.getContext("2d");

        // If the screenState is changed to "WorldMap", render the world map:
        if (screenState === "WorldMap") {
            drawWorldMap(mgCtx, uiCtx, mgCanvas, uiCanvas);
        }

    }, [screenState])
    
    /**
     * A function for rendering the default background with the title. 
     * "Press Enter to start" text is displayed.
     */
    function drawTitleScreen(mgCtx, mgCanvas) {

        // Clear the canvas of any previous render:
        mgCtx.clearRect(0, 0, mgCanvas.width, mgCanvas.height);

        // Draw the title text (image) with specific centered placement:
        const titleXPos = (mgCanvas.width - titleImage.width) / 2;
        const titleYPos = (mgCanvas.height - titleImage.height) / 2 - 70;
        mgCtx.drawImage(titleImage, titleXPos, titleYPos, titleImage.width, titleImage.height);

    };

    /**
     * A function for animating the pulse of the enter button.
     */
    function animatePressEnter(ctx, canvas) {

        // Clear the UI canvas:
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Update the scale
        enterButScale += enterButDirection * enterButScaleSpeed;
        if (enterButScale > enterButMaxScale || enterButScale < enterButMinScale) {
            enterButDirection *= -1; // Reverse scaling direction
        }
    
        // Calculate scaled size and position
        const enterButWidth = enterButton.width * enterButScale;
        const enterButHeight = enterButton.height * enterButScale;
        const enterXPos = (canvas.width - enterButWidth) / 2;
        const enterYPos = (canvas.height - enterButHeight) / 2;
    
        ctx.drawImage(enterButton, enterXPos, enterYPos, enterButWidth, enterButHeight);
    
        // Continue the animation
        animationFrameId = requestAnimationFrame(() => animatePressEnter(ctx, canvas));

    }
    

    /**
     * A function for rendering the default background with the world map. 
     */
    function drawWorldMap(mgCtx, uiCtx, mgCanvas, uiCanvas) {

        // Clear the canvas of any previous render:
        mgCtx.clearRect(0, 0, mgCanvas.width, mgCanvas.height);
        uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);

        // Draw the world map with specific centered placement:
        const centerX = (mgCanvas.width - mapImage.width) / 2;
        const centerY = (mgCanvas.height - mapImage.height) / 2;
        mgCtx.drawImage(mapImage, centerX, centerY, mapImage.width, mapImage.height);

        // Draw in the initial monitors:
        // Plans to animate these later:
        const topMonitorX = (uiCanvas.width - topMonitor.width) / 2 + 200;
        const topMonitorY = (uiCanvas.height - topMonitor.height) / 2;
        uiCtx.drawImage(topMonitor, topMonitorX, topMonitorY, topMonitor.width, topMonitor.height);
        const bottomMonitorX = (uiCanvas.width - bottomMonitor.width) / 2 + 200;
        const bottomMonitorY = (uiCanvas.height - bottomMonitor.height) / 2;
        uiCtx.drawImage(bottomMonitor, bottomMonitorX, bottomMonitorY, bottomMonitor.width, bottomMonitor.height);

    };

    /**
     * A function to render the Algebraia map
     */
    function renderAlgebra(){

        // Set mgCanvas and mgCtx, if the canvas ref doesnt exist, return:
        const uiCanvas = uiCanvasRef.current;
        if (!uiCanvas) {
            return;
        }
        const uiCtx = uiCanvas.getContext("2d");

        // Clear the canvas of any previous render:
        uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);

        // Render the new monitors:
        const x = (uiCanvas.width - algebraiaLevels.width) / 2 + 200;
        const y = (uiCanvas.height - algebraiaLevels.height) / 2;
        uiCtx.drawImage(algebraiaLevels, x, y, algebraiaLevels.width, algebraiaLevels.height);

    }
    /**
     * A function to render the Statstrider map
     */
    function renderStats(){
        
        // Set mgCanvas and mgCtx, if the canvas ref doesnt exist, return:
        const uiCanvas = uiCanvasRef.current;
        if (!uiCanvas) {
            return;
        }
        const uiCtx = uiCanvas.getContext("2d");

        // Clear the canvas of any previous render:
        uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);

        // Render the new monitors:
        const x = (uiCanvas.width - statstriderLevels.width) / 2 + 200;
        const y = (uiCanvas.height - statstriderLevels.height) / 2;
        uiCtx.drawImage(statstriderLevels, x, y, statstriderLevels.width, statstriderLevels.height);

    }
    /**
     * A function to render the Calcomet map
     */
    function renderCalc(){

        // Set mgCanvas and mgCtx, if the canvas ref doesnt exist, return:
        const uiCanvas = uiCanvasRef.current;
        if (!uiCanvas) {
            return;
        }
        const uiCtx = uiCanvas.getContext("2d");

        // Clear the canvas of any previous render:
        uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);

        // Render the new monitors:
        const x = (uiCanvas.width - calcometLevels.width) / 2 + 200;
        const y = (uiCanvas.height - calcometLevels.height) / 2;
        uiCtx.drawImage(calcometLevels, x, y, calcometLevels.width, calcometLevels.height);
        
    }
    /**
     * A function to render the Physix map
     */
    function renderPhysics(){

        // Set mgCanvas and mgCtx, if the canvas ref doesnt exist, return:
        const uiCanvas = uiCanvasRef.current;
        if (!uiCanvas) {
            return;
        }
        const uiCtx = uiCanvas.getContext("2d");

        // Clear the canvas of any previous render:
        uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);

        // Render the new monitors:
        const x = (uiCanvas.width - physixLevels.width) / 2 + 200;
        const y = (uiCanvas.height - physixLevels.height) / 2;
        uiCtx.drawImage(physixLevels, x, y, physixLevels.width, physixLevels.height);
        
    }

    /**
     * Mutes or unmutes music:
     */
    function toggleMuteButton(){

        // See if there is music loaded:
        const music = currentMusicRef.current;
        if (!music) return;

        // Toggle music:
        if (isMuted) {
            music.play().catch(err => console.warn("Autoplay failed:", err));
          } else {
            music.pause();
          }
          setIsMuted(!isMuted);

    }

    /**
     * Updates the state based on user input. 
     * 
     * @param {*} event 
     */
    function handleKeyPress(event) {
        
        // If the "Enter" key is pressed:
        if(event.key === "Enter") {
            // If the screen is on the title screen, render the world map:
            if (screenState === "Title") {
                cancelAnimationFrame(animationFrameId);
                setScreenState("WorldMap");
            }
        }

    }

    // Return the current canvases:
    return (
        <div className = "canvas-container">
            {/* Background Canvas (always drawn) */}
            <canvas ref={bgCanvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }} />
            {/* Middle Ground Canvas (Only Updates Middle Ground elements) */}
            <canvas ref={mgCanvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }} />
            {/* UI Canvas (Only Updates UI elements) */}
            <canvas ref={uiCanvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 3 }} />

            {/* Music Start Button */}
            <img
            src={isMuted ? "/isMuted.png" : "/isNotMuted.png"}
            alt={isMuted ? "Unmute" : "Mute"}
            onClick={toggleMuteButton}
            style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            zIndex: 4,
            cursor: "pointer"
            }}
            />

            {/* Algebraia Button */}
            {screenState === "WorldMap" && 
            (<img
            src= "/Algebraia.png"
            onClick={renderAlgebra}
            style={{
            position: "absolute",
            top: "33%",
            right: "57%",
            zIndex: 4,
            cursor: "pointer",
            }}
            />)}

            {/* Statstrider Button */}
            {screenState === "WorldMap" && 
            (<img
            src= "/SS-Statstrider.png"
            onClick={renderStats}
            style={{
            position: "absolute",
            top: "36%",
            right: "40%",
            zIndex: 4,
            cursor: "pointer",
            }}
            />)}

            {/* Calcomet Button */}
            {screenState === "WorldMap" && 
            (<img
            src= "/The-Calcomet.png"
            onClick={renderCalc}
            style={{
            position: "absolute",
            top: "35%",
            right: "21%",
            zIndex: 4,
            cursor: "pointer",
            }}
            />)}

            {/* Physix Button */}
            {screenState === "WorldMap" && 
            (<img
            src= "/PhysiX-1.png"
            onClick={renderPhysics}
            style={{
            position: "absolute",
            top: "35%",
            right: "4.5%",
            zIndex: 4,
            cursor: "pointer",
            }}
            />)}

        </div>
    );

};

export default GameCanvas;
