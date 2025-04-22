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
    const [gameStatus, setGameStatus] = useState(null);

    // Pre-Loading images:
    const world1Background = new Image();
    world1Background.src = "/World 1.png";
    const world2Background = new Image();
    world2Background.src = "/World 2.png";
    const world3Background = new Image();
    world3Background.src = "/World 3.png";
    const world4Background = new Image();
    world4Background.src = "/World 4.png";

    const world1Enemy = new Image();
    world1Enemy.src = "/world1Enemy.png";
    const world2Enemy = new Image();
    world2Enemy.src = "/world2Enemy.png";
    const world3Enemy = new Image();
    world3Enemy.src = "/world3Enemy.png";
    const world4Enemy = new Image();
    world4Enemy.src = "/world4Enemy.png";

    const playerImage = new Image();
    playerImage.src = "/PlayerImage.png";    

    const backgroundImage =
    world === 1 ? world1Background
    : world === 2 ? world2Background
    : world === 3 ? world3Background
    : world === 4 ? world4Background
    : world1Background;

    const enemySprite =
    world === 1 ? world1Enemy
    : world === 2 ? world2Enemy
    : world === 3 ? world3Enemy
    : world === 4 ? world4Enemy
    : world1Enemy;

    // Life icons
    const fullLifeIcon = "/FullHeart.png";
    const emptyLifeIcon = "/EmptyHeart.png";

    // { question, answer, png }
    const [enemies, setEnemies] = useState([]);
    // user‐typed answers
    const [answers, setAnswers] = useState([]);
    // whether each one is beaten
    const [defeated, setDefeated] = useState([]);
    // 3 attempts total
    const [lives, setLives] = useState(3);

    // Changed: spawn count = level index + 1
    const spawnCount = level + 1;


    //Demo Database
    const questions = [
      // --- Algebra (0–29)
      { question: "Solve for x: 2x + 3 = 7", answer: "2", type: "ALG" },
      { question: "What is the value of x in the equation x/2 = 6?", answer: "12", type: "ALG" },
      { question: "Simplify: (3x)(2x)", answer: "6x", type: "ALG" },
      { question: "Factor: x^2 = 9", answer: "3", type: "ALG" },
      { question: "Evaluate: 5x when x = 3", answer: "15", type: "ALG" },
      { question: "What is 2^3?", answer: "8", type: "ALG" },
      { question: "If y = 2x and x = 4, what is y?", answer: "8", type: "ALG" },
      { question: "Expand: (x + 2)^2", answer: "2x^2+4x+4", type: "ALG" },
      { question: "What is the slope of y = 5x + 2?", answer: "5", type: "ALG" },
      { question: "Solve: 3x - 5 = 16", answer: "7", type: "ALG" },
      { question: "Find x: x^2 = 49", answer: "7", type: "ALG" },
      { question: "What is the y-intercept of y = -3x + 6?", answer: "6", type: "ALG" },
      { question: "Combine like terms: 3x + 4x", answer: "7x", type: "ALG" },
      { question: "What is 9 - 4 * 2?", answer: "1", type: "ALG" },
      { question: "Solve: x/3 = 5", answer: "15", type: "ALG" },
      { question: "What is 10% of 50?", answer: "5", type: "ALG" },
      { question: "Factor: x^2 + 5x + 6", answer: "2", type: "ALG" },
      { question: "What is 7^2?", answer: "49", type: "ALG" },
      { question: "Simplify: 2x - x", answer: "1", type: "ALG" },
      { question: "Evaluate: (2 + 3) * 4", answer: "20", type: "ALG" },
      { question: "Find the average of 3, 5, 7", answer: "5", type: "ALG" },
      { question: "What is 8 * 7?", answer: "56", type: "ALG" },
      { question: "Solve: 12 = 3x", answer: "4", type: "ALG" },
      { question: "What is the square root of 64?", answer: "8", type: "ALG" },
      { question: "Simplify: 2(x + 3)", answer: "2", type: "ALG" },
      { question: "What is the cube of 3?", answer: "27", type: "ALG" },
      { question: "Find x: x + 5 = 9", answer: "4", type: "ALG" },
      { question: "Solve: x - 7 = 3", answer: "10", type: "ALG" },
      { question: "What is (x+1)(x-1) when x=2?", answer: "3", type: "ALG" },
      { question: "Evaluate 3^3", answer: "27", type: "ALG" },
    
      // --- Stats (30–59)
      { question: "What is the mean of 2, 4, 6?", answer: "4", type: "STAT" },
      { question: "Find the median of 1, 3, 5, 7, 9", answer: "5", type: "STAT" },
      { question: "Mode of 1, 2, 2, 3?", answer: "2", type: "STAT" },
      { question: "Range of 5, 10, 15?", answer: "10", type: "STAT" },
      { question: "If mean is 6 and total items are 3, what is the sum?", answer: "18", type: "STAT" },
      { question: "Find the variance of 2, 4, 4, 4, 5, 5, 7, 9", answer: "4", type: "STAT" },
      { question: "Standard deviation of 1, 1, 1, 1?", answer: "0", type: "STAT" },
      { question: "Probability of getting head in fair coin?", answer: "1", type: "STAT" },
      { question: "How many outcomes for 2 dice?", answer: "36", type: "STAT" },
      { question: "Median of 4, 5, 6, 7?", answer: "5", type: "STAT" },
      { question: "What is the z-score if x = 70, μ = 60, σ = 5?", answer: "2", type: "STAT" },
      { question: "If P(A) = 0.3 and P(B) = 0.5, find P(A and B) assuming independence", answer: "0", type: "STAT" },
      { question: "If sample mean is 10, n = 5, find sum", answer: "50", type: "STAT" },
      { question: "In a normal distribution, what % is within 1 SD?", answer: "68", type: "STAT" },
      { question: "Median of 2, 3, 5, 7, 11", answer: "5", type: "STAT" },
      { question: "What’s the mode of 3, 3, 4, 5?", answer: "3", type: "STAT" },
      { question: "What is the mean of 5 and 15?", answer: "10", type: "STAT" },
      { question: "How many combinations of 3 items out of 5?", answer: "10", type: "STAT" },
      { question: "If mean is 20 and SD is 4, find z-score for 28", answer: "2", type: "STAT" },
      { question: "Probability of rolling a 6 on fair die?", answer: "1", type: "STAT" },
      { question: "What is the range of 3, 6, 9, 12?", answer: "9", type: "STAT" },
      { question: "Find mean: 10, 20, 30", answer: "20", type: "STAT" },
      { question: "Probability of tails on coin flip?", answer: "1", type: "STAT" },
      { question: "What is the median of 1, 2, 3, 4, 5?", answer: "3", type: "STAT" },
      { question: "Variance of identical values?", answer: "0", type: "STAT" },
      { question: "What’s 1 SD above mean if mean=100, SD=10?", answer: "110", type: "STAT" },
      { question: "What’s the sample mean of 8, 10, 12?", answer: "10", type: "STAT" },
      { question: "If P(A) = 0.6 and P(B) = 0.4, find P(A or B) assuming independence", answer: "0", type: "STAT" },
      { question: "What is standard deviation squared?", answer: "4", type: "STAT" },
      { question: "Find mean of 2, 4, 6, 8", answer: "5", type: "STAT" },
    
      // --- Calculus (60–89)
      { question: "What is the derivative of x^2?", answer: "2x", type: "CALC" },
      { question: "Integral of 1 dx?", answer: "x", type: "CALC" },
      { question: "Limit of (x^2 - 1)/(x - 1) as x → 1", answer: "2", type: "CALC" },
      { question: "Derivative of sin(x)?", answer: "cos(x)", type: "CALC" },
      { question: "What is ∫2x dx?", answer: "x^2 + C", type: "CALC" },
      { question: "What is d/dx of ln(x)?", answer: "1/x", type: "CALC" },
      { question: "What is d/dx of e^x?", answer: "e^x", type: "CALC" },
      { question: "What is ∫cos(x) dx?", answer: "sin(x) + C", type: "CALC" },
      { question: "What is the derivative of tan(x)?", answer: "sec^2(x)", type: "CALC" },
      { question: "What is the integral of 0?", answer: "C", type: "CALC" },
      { question: "Limit of 1/x as x → ∞", answer: "0", type: "CALC" },
      { question: "Limit of sin(x)/x as x → 0", answer: "1", type: "CALC" },
      { question: "d/dx of x^3", answer: "3x^2", type: "CALC" },
      { question: "d/dx of 1/x", answer: "-1/x^2", type: "CALC" },
      { question: "∫x dx", answer: "x^2/2 + C", type: "CALC" },
      { question: "∫x^2 dx", answer: "x^3/3 + C", type: "CALC" },
      { question: "d/dx of cos(x)", answer: "-sin(x)", type: "CALC" },
      { question: "∫e^x dx", answer: "e^x + C", type: "CALC" },
      { question: "∫1/x dx", answer: "ln|x| + C", type: "CALC" },
      { question: "Limit of x as x → 0", answer: "0", type: "CALC" },
      { question: "Limit of constant c as x → a", answer: "c", type: "CALC" },
      { question: "d/dx of x^0", answer: "0", type: "CALC" },
      { question: "What is d/dx of a constant?", answer: "0", type: "CALC" },
      { question: "If f(x) = x^2, find f'(2)", answer: "4", type: "CALC" },
      { question: "What is ∫0 to 2 of x dx?", answer: "2", type: "CALC" },
      { question: "Find d/dx of 5x^4", answer: "20x^3", type: "CALC" },
      { question: "What is ∫3 dx?", answer: "3x + C", type: "CALC" },
      { question: "If f(x) = x^2, find slope at x = 3", answer: "6", type: "CALC" },
      { question: "Limit of (x+2)^2 as x → -2", answer: "0", type: "CALC" },
      { question: "What is the average rate of change of f(x)=x^2 from 1 to 3?", answer: "4", type: "CALC" },
    
      // --- Physics (90–119)
      { question: "What is Newton’s 2nd law?", answer: "F=ma", type: "PHYS" },
      { question: "Acceleration due to gravity on Earth?", answer: "10", type: "PHYS" },
      { question: "What is the unit of force?", answer: "Newton", type: "PHYS" },
      { question: "Speed = distance/time. If d=100m, t=20s?", answer: "5", type: "PHYS" },
      { question: "Unit of energy?", answer: "Joule", type: "PHYS" },
      { question: "What’s the formula for kinetic energy?", answer: "1", type: "PHYS" },
      { question: "What is Ohm’s Law?", answer: "V=IR", type: "PHYS" },
      { question: "What is power formula?", answer: "P=IV", type: "PHYS" },
      { question: "What is the unit of electric current?", answer: "Ampere", type: "PHYS" },
      { question: "What is the speed of light?", answer: "3", type: "PHYS" },
      { question: "What is the formula for momentum?", answer: "mv", type: "PHYS" },
      { question: "Mass = 10kg, g = 9.8, what’s weight?", answer: "98", type: "PHYS" },
      { question: "What is the formula for work?", answer: "Fd", type: "PHYS" },
      { question: "What is Hooke’s Law?", answer: "F=kx", type: "PHYS" },
      { question: "If v = 10m/s and t = 5s, find d", answer: "50", type: "PHYS" },
      { question: "What is frequency’s unit?", answer: "Hertz", type: "PHYS" },
      { question: "What’s the unit of charge?", answer: "Coulomb", type: "PHYS" },
      { question: "What’s acceleration if velocity is constant?", answer: "0", type: "PHYS" },
      { question: "If F = 20N and m = 5kg, find a", answer: "4", type: "PHYS" },
      { question: "If m = 2kg, v = 3m/s, find KE", answer: "9", type: "PHYS" },
      { question: "Potential energy = mgh. m=2, g=10, h=5?", answer: "100", type: "PHYS" },
      { question: "If displacement is 0, work done is?", answer: "0", type: "PHYS" },
      { question: "If charge = 2C, V = 10V, find energy", answer: "20", type: "PHYS" },
      { question: "What is the formula for density?", answer: "m/V", type: "PHYS" },
      { question: "What is absolute zero in Celsius?", answer: "-273", type: "PHYS" },
      { question: "Sound travels faster in water or air?", answer: "water", type: "PHYS" },
      { question: "What is reflection?", answer: "bouncing", type: "PHYS" },
      { question: "A car accelerates from 0 to 60 in 10s. Find a", answer: "6", type: "PHYS" },
      { question: "What’s inertia?", answer: "resistance to motion change", type: "PHYS" },
      { question: "What happens to current if resistance increases?", answer: "decreases", type: "PHYS" }
    ];





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
            mgCtx.drawImage(playerImage, 300, 600, 350, 350); //maybe replace width and height with something non-static(as in stored somewhere; technically still static) later
        }

        /*
        enemySprite.onload = () => {
          mgCtx.drawImage(enemySprite, 900, 600, 350, 350); //maybe replace width and height with something non-static(as in stored somewhere; technically still static) later
        }*/
    }, [])

    useEffect(() => {
      // Modified: Replace API fetch with local questions logic
      // Determine question slice indices based on world
      const startIdx = (world - 1) * 30;
      const endIdx = world * 30;
      // Randomly pick spawnCount questions within range
      const picks = [];
      const available = questions.slice(startIdx, endIdx);
      for (let i = 0; i < spawnCount; i++) {
        const idx = Math.floor(Math.random() * available.length);
        picks.push({
          question: available[idx].question,
          answer: available[idx].answer
        });
      }
      setEnemies(picks);
      setAnswers(Array(spawnCount).fill(''));
      setDefeated(Array(spawnCount).fill(false));
      setLives(3);
    }, [world, level, spawnCount]);
    
    const handleSubmit = i => {
      // Existing answer check
      if (answers[i].trim().toLowerCase() === enemies[i].answer.trim().toLowerCase()) {
        const newDef = [...defeated];
        newDef[i] = true;
        setDefeated(newDef);
      } else {
        setWrong(true);
        setLives(lives - 1);
      }
    };

    useEffect(() => {
      // victory if all enemies defeated
      if (defeated.length > 0 && defeated.every((d) => d)) {
        setGameStatus("victory");
        setTimeout(() => {
          if (onLevelComplete) onLevelComplete();    // CHANGED: unlock & return
          else returnToMap();
        }, 5000);
      }
      // defeat if lives run out
      else if (lives <= 0) {
        setGameStatus("defeat");
        setTimeout(() => returnToMap(), 5000);
      }
    }, [defeated, lives, onLevelComplete, returnToMap]);

    //Return current canvases:
    return(
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
            <img src="/MapButton.png"
            onClick={returnToMap}
            style={{
            position: "absolute",
            top: "-1px",
            left: "0px",
            zIndex: 10,
            fontSize: "1rem",
            cursor: "pointer"
            }}
            /> ⬅ Back to Map

            {/* Lives display as icons */}
            <div style={{ position: "absolute", top: 600, right: 1300, zIndex: 6, display: "flex" }}>
              {[0, 1, 2].map(idx => (
                <img
                  key={idx}
                  src={idx < lives ? fullLifeIcon : emptyLifeIcon}
                  style={{ width: 30, height: 30, marginLeft: idx === 0 ? 0 : 100 , transform: "scale(3)"}}
                />
              ))}
            </div>

            {/* Render each enemy */}
            {enemies.map((e, i) => {
              const canvasWidth = 1920;
              const spread = 0.3;
              const usableWidth = canvasWidth * spread;
              const margin = (canvasWidth - usableWidth) / 2;
              
              const x = margin + (i / (spawnCount - 1)) * usableWidth + 300;
              const y = 720;
              return (
                <div key={i}>
                  {/* Enemy sprite */}
                  <img
                    src={enemySprite.src}
                    alt="Enemy"
                    style={{
                      position: "absolute",
                      transform: "scale(4)",
                      top: y,
                      left: x,
                      right: 500,
                      zIndex: 6,
                      width: 100,
                      height: 100
                    }}
                  />
                  {/* question & input only if not yet defeated */}
                  {!defeated[i] && (
                    <>
                      <p
                        style={{
                          position: "absolute",
                          top: 530,
                          left: x,
                          right: 500,
                          zIndex: 6,
                          width: 110,
                          fontFamily: `"Comic Sans MS", "Comic Sans"`,
                          fontSize: "1.6rem",
                          color: "#fff",
                          height: 25
                        }}
                      >
                      {e.question}
                      </p>
                      <input
                        type="text"
                        value={answers[i]}
                        onChange={(ev) => {
                          const a = [...answers];
                          a[i] = ev.target.value;
                          setAnswers(a);
                        }}
                        onKeyDown={(ev) => ev.key === "Enter" && handleSubmit(i)}
                        style={{
                          position: "absolute",
                          top: 900,
                          left: x,
                          right: 500,
                          zIndex: 10,
                          width: 100,
                          height: 25
                        }}
                      />
                      <button
                        onClick={() => handleSubmit(i)}
                        style={{
                          position: "absolute",
                          top: 930,
                          left: x,
                          right: 500,
                          zIndex: 10,
                          width: 110,
                          height: 25
                        }}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </div>
              );
            })}
            {/* === overlay === */}
            {gameStatus && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                  fontFamily: `"Comic Sans MS", "Comic Sans"`,
                  fontSize: "10rem",
                  color: "#fff"   
                }}
              >
                {gameStatus === 'victory' ? 'Victory!' : 'Defeat!'}
              </div>
            )}

            {/* disable the question/answer form once gameStatus is set */}
            {!gameStatus && (
              <>
                {/* your existing question display, input, submit button, lives icons, etc. */}
              </>
            )}



        </div>
    );
};

export default CombatCanvas;