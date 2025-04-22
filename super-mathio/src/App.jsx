/**
 * Import needed files/libraries/ect.
 */
import { useState, useRef, useEffect, useMemo } from "react";
import CatBotCanvas from "./CatBotCanvas";
import TitleCanvas from "./TitleCanvas";
import MapCanvas from "./MapCanvas";
import CombatCanvas from "./CombatCanvas";

function App() {

    // Set the state of the screen:
    const [screenState, setScreenState] = useState("Title"); // "Title" or "Map" or "CatBot" or "Combat"
    const [isMuted, setIsMuted] = useState(true); // Tracks the state of the mute button
    const currentMusicRef = useRef(null) // References the current music playing
    
    const [currentWorld, setCurrentWorld] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(null);

    const [unlockedWorld, setUnlockedWorld] = useState(1); 
    const [unlockedLevel, setUnlockedLevel] = useState(2);
    

    // Load ALL tracks only once:
    // Only create these once
    const titleAndMapTrack = useMemo(() => {
        const audio = new Audio("/MainScreen-SpaceTravel.mp3");
        audio.loop = true;
        return audio;
    }, []);

    const catBotTrack = useMemo(() => {
        const audio = new Audio("/CatBotLesson.mp3"); //
        audio.loop = true;
        return audio;
    }, []);

    const combatTrack = useMemo(() => {
        const audio = new Audio("/Combat.mp3"); //
        audio.loop = true;
        return audio;
    }, []);
   
    /**
     * A use effect to set the initial track to the title and map track
     */
    useEffect(() => {

        const currentTrack = currentMusicRef.current;
        let newTrack;
        if (screenState === "Map" || screenState === "Title") {
        newTrack = titleAndMapTrack;
        } else if (screenState === "CatBot") {
        newTrack = catBotTrack;
        } else if (screenState === "Combat") {
        newTrack = combatTrack;
        }

        if (currentTrack === newTrack) return;

        if (currentTrack) {
        currentTrack.pause();
        currentTrack.currentTime = 0;
        }

        currentMusicRef.current = newTrack;
        if (!isMuted) {
        currentMusicRef.current
            .play()
            .catch((err) => console.warn("Autoplay failed:", err));
        }
    }, [screenState, isMuted]);
    

    // Use effect to handle music playback on screen change
    useEffect(() => {

        // Declare music variables:
        let currentTrack = currentMusicRef.current;
        let newTrack;

        if (screenState === "Map" || screenState === "Title") {
            newTrack = titleAndMapTrack;
        } else if (screenState === "CatBot") {
            newTrack = catBotTrack;
        } else if (screenState === "Combat") {
            newTrack = combatTrack;
        }

        // If same as before, no need to restart:
        if (currentTrack === newTrack) return;

        // Stop the previous track:
        if (currentTrack) {
            currentTrack.pause();
            currentTrack.currentTime = 0;
        }

        // Set and play new track:
        currentMusicRef.current = newTrack;
        currentMusicRef.current.play().catch((err) => console.warn("Autoplay failed:", err));

    }, [screenState]);

    /**
     * Mutes or unmutes music:
     */
    function toggleMute(){

        // See if there is music loaded:
        const music = currentMusicRef.current;
        if (!music) return;

        // Toggle music:
        if (isMuted) {
            music.play().catch(err => console.warn("Autoplay failed:", err));
          } 
        else {
            music.pause();
        }
        setIsMuted(!isMuted);

    }

    function handleStartCombat(world, level) {
            setCurrentWorld(world);
            setCurrentLevel(level);
            setScreenState("Combat");
    }

    function handleLevelComplete() {
        setUnlockedLevel(prev => {
            if (prev >= 4) {
                setUnlockedWorld(w => w + 1);
                return 0;
            }
            return prev + 1;
        });
        setScreenState("Map");
    }

    // Return the currently selected screen:
    return (
        <div>
        {screenState === "Title" && (
            <TitleCanvas openMap={() => setScreenState("Map")} 
            toggleMute={toggleMute}
            isMuted={isMuted}
            />
        )}
        {screenState === "Map" && (
            <MapCanvas onOpenCatBot={() => setScreenState("CatBot")} 
            toggleMute={toggleMute}
            isMuted={isMuted}
            currentWorld={unlockedWorld}
            currentLevel={unlockedLevel}
            onStartCombat={handleStartCombat}
            />
        )}
        {screenState === "CatBot" && (
            <CatBotCanvas returnToMap={() => setScreenState("Map")}
            toggleMute={toggleMute}
            isMuted={isMuted}
            />
        )}
        {screenState === "Combat" && (
            <CombatCanvas
                returnToMap={() => setScreenState("Map")}
                toggleMute={toggleMute}
                isMuted={isMuted}
                world={currentWorld}
                level={currentLevel}
                onLevelComplete={handleLevelComplete}
            />
            
        )}
        </div>
    );
}

export default App;