/**
 * Import needed files/libraries/ect.
 * GameCanvas is where and how the game is rendered.
 */
import { useState } from "react";
import TitleAndWorldCanvas from "./TitleAndWorldCanvas";
import CatBotCanvas from "./CatBotCanvas";

function App() {

  // Set the state of the screen
  const [screenState, setScreenState] = useState("TitleAndWorlds"); // or "CatBot" or "Combat"

  return (
    <div>
      {screenState === "TitleAndWorlds" && (
        <TitleAndWorldCanvas onOpenCatBot={() => setScreenState("CatBot")} />
      )}
      {screenState === "CatBot" && (
        <CatBotCanvas returnToMap={() => setScreenState("TitleAndWorlds")}/>
      )}
    </div>
  );
}

export default App;