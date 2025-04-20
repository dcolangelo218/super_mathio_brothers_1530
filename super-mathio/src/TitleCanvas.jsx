/**
 * Import needed files/libraries/ect.
 * These allow us to use effects and update the state.
 */
import { useEffect, useRef, useState } from "react";
import "./GameCanvas.css";
import "./MapCanvas.jsx";

/**
 * Where the Title Screen is displayed.
 * 
 * @returns The updated canvas based on it's state.
 */
const TitleCanvas = ({ openMap, toggleMute, isMuted }) => {

    // Load the canvas reference objects and assign the initial states:
    const uiCanvasRef = useRef(null); // UI Canvas
    const bgCanvasRef = useRef(null); // Background Canvas
    const mgCanvasRef = useRef(null); // Middle ground canvas (not UI asset, not default background)

    // Pre-Load ALL images:
    const backgroundImage = new Image();
    backgroundImage.src = "/BlankBackground.png";
    const titleImage = new Image();
    titleImage.src = "/SuperMathioTitle.png";
    const enterButton = new Image();
    enterButton.src = "/EnterButton.png";

    // Define Variables for enterButton animation:
    let enterButScale = 1;
    let enterButDirection = 1;
    const enterButMinScale = 0.95;
    const enterButMaxScale = 1.05;
    const enterButScaleSpeed = 0.0025; // Controls how fast it pulses
    let animationFrameId;

    /**
     * A function that updates the title screen and allows us to fetch component data.
     */
    useEffect(() => {

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
        }

    }, [])

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
    function animatePressEnter(uiCtx, uiCanvas) {

        // Clear the UI canvas:
        uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
    
        // Update the scale
        enterButScale += enterButDirection * enterButScaleSpeed;
        if (enterButScale > enterButMaxScale || enterButScale < enterButMinScale) {
            enterButDirection *= -1; // Reverse scaling direction
        }
    
        // Calculate scaled size and position
        const enterButWidth = enterButton.width * enterButScale;
        const enterButHeight = enterButton.height * enterButScale;
        const enterXPos = (uiCanvas.width - enterButWidth) / 2;
        const enterYPos = (uiCanvas.height - enterButHeight) / 2;
    
        uiCtx.drawImage(enterButton, enterXPos, enterYPos, enterButWidth, enterButHeight);
    
        // Continue the animation
        animationFrameId = requestAnimationFrame(() => animatePressEnter(uiCtx, uiCanvas));

    }

    /**
     * Updates the state based on user input. 
     * 
     * @param {*} event 
     */
    function handleKeyPress(event) {
        
        // If the "Enter" key is pressed:
        if(event.key === "Enter") {
            // Render the world map:
            cancelAnimationFrame(animationFrameId);
            openMap();
        }

    }

    // Return the current canvases and any buttons:
    return (
        <div className = "canvas-container">
            {/* Background Canvas (always drawn) */}
            <canvas ref={bgCanvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }} />
            {/* Middle Ground Canvas (Only Updates Middle Ground elements) */}
            <canvas ref={mgCanvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }} />
            {/* UI Canvas (Only Updates UI elements) */}
            <canvas ref={uiCanvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 3 }} />

            {/* Mute Button */}
            <img
            src={isMuted ? "/isMuted.png" : "/isNotMuted.png"}
            alt={isMuted ? "Unmute" : "Mute"}
            onClick={toggleMute}
            style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            zIndex: 4,
            cursor: "pointer"
            }}
            />
        </div>
    );

 }

 export default TitleCanvas;