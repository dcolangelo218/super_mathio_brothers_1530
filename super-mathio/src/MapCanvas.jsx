/**
 * Import needed files/libraries/ect.
 * These allow us to use effects and update the state.
 */
import { useEffect, useRef, useState } from "react";
import "./GameCanvas.css";
import "./CatBotCanvas.jsx";

/**
 * Where the World Map is displayed.
 * 
 * @returns The updated canvas based on it's state.
 */
const MapCanvas = ({ onOpenCatBot, toggleMute, isMuted }) => {

    // Load the canvas reference objects and assign the initial states:
    const uiCanvasRef = useRef(null); // UI Canvas
    const bgCanvasRef = useRef(null); // Background Canvas
    const mgCanvasRef = useRef(null); // Middle ground canvas (not UI asset, not default background)
    const [worldSelected, setSelectedWorld] = useState("None"); // Tracks if a level has been selected, "Algebra", "Stats", "Calc", or "Physics"

    // Pre-Load ALL images:
    const backgroundImage = new Image();
    backgroundImage.src = "/BlankBackground.png";
    const mapImage = new Image();
    mapImage.src = "/WorldMap.png";

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

    /**
     * A function that updates the main screen and allows us to fetch component data.
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
        // Draw the world map:
        mapImage.onload = () => {
            drawWorldMap(mgCtx, uiCtx, mgCanvas, uiCanvas);
        }

    }, [])
    
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

        // Animate in the initial monitors:
        animateMonitors(uiCtx, uiCanvas);

    };

    /**
     * A function for animating monitors sliding into frame
     */
    
    function animateMonitors(ctx, canvas) {

        // Define Variables for monitors animation:
        let topMonitorCurrY = -topMonitor.height;
        const topMonitorTargetY = 0;
        let bottomMonitorCurrY = canvas.height;
        const bottomMonitorTargetY = canvas.height - bottomMonitor.height;

        // Clear the UI canvas:
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Continue the animation:
        requestAnimationFrame(step);

        // Create the step function for the actual animation:
        function step() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            const topMonitorX = (canvas.width - topMonitor.width) / 2 + 200;
            const bottomMonitorX = (canvas.width - bottomMonitor.width) / 2 + 200;
            ctx.drawImage(topMonitor, topMonitorX, topMonitorCurrY);
            ctx.drawImage(bottomMonitor, bottomMonitorX, bottomMonitorCurrY);
        
            let animating = false;
        
            if (topMonitorCurrY < topMonitorTargetY - 0.5) {
                topMonitorCurrY += (topMonitorTargetY - topMonitorCurrY) * 0.1;
                animating = true;
            } else {
                topMonitorCurrY = topMonitorTargetY; 
            }
        
            if (bottomMonitorCurrY > bottomMonitorTargetY + 0.5) {
                bottomMonitorCurrY += (bottomMonitorTargetY - bottomMonitorCurrY) * 0.1;
                animating = true;
            } else {
                bottomMonitorCurrY = bottomMonitorTargetY;
            }
        
            if (animating) {
                requestAnimationFrame(step);
            }
        }

    }

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
        setSelectedWorld("Algebra");

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
        setSelectedWorld("Stats");

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
        setSelectedWorld("Calc");
        
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
        setSelectedWorld("Physics");
        
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

            {/* catBot Button */}
            {worldSelected !== "None" && 
            (<img
            src= "/CatBotButton.png"
            onClick={onOpenCatBot}
            style={{
            position: "absolute",
            top: "73.5%",
            right: "37.75%",
            zIndex: 4,
            cursor: "pointer",
            }}
            />)}

            {/* Algebraia Button */}
            <img
            src= "/Algebraia.png"
            onClick={renderAlgebra}
            style={{
            position: "absolute",
            top: "33%",
            right: "57%",
            zIndex: 4,
            cursor: "pointer",
            }}
            />

            {/* Statstrider Button */}
            <img
            src= "/SS-Statstrider.png"
            onClick={renderStats}
            style={{
            position: "absolute",
            top: "36%",
            right: "40%",
            zIndex: 4,
            cursor: "pointer",
            }}
            />

            {/* Calcomet Button */}
            <img
            src= "/The-Calcomet.png"
            onClick={renderCalc}
            style={{
            position: "absolute",
            top: "35%",
            right: "21%",
            zIndex: 4,
            cursor: "pointer",
            }}
            />

            {/* Physix Button */}
            <img
            src= "/PhysiX-1.png"
            onClick={renderPhysics}
            style={{
            position: "absolute",
            top: "35%",
            right: "4.5%",
            zIndex: 4,
            cursor: "pointer",
            }}
            />

        </div>
    );

}

export default MapCanvas;