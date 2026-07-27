import { useState } from "react";
import "./style.css";
import Grid from "./components/Grid";
import InfoCard from "./components/InfoCard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";
import WinCard from "./components/WinCard";
import { Instructions as Constants } from "./constants";

export default function App() {
  const [selectedSize, setSelectedSize] = useState(3);
  const [isVisible, setIsVisible] = useState("");
  const [gameActive, setGameActive] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);
  const [allParitySet, setAllParitySet] = useState(false);
  const [boardLocked, setBoardLocked] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameId, setGameId] = useState(0);

  const playDisabled = gameActive;
  const resetDisabled = !gameActive;
  const flipDisabled = !gameActive || isFlipping || hasFlipped || !allParitySet;

  function handleClick(section: string) {
    setIsVisible((current) => (current === section ? "" : section));
  }

  function startGame() {
    setGameActive(true);
    setHasFlipped(false);
    setBoardLocked(false);
  }

  function resetGame() {
    setGameWon(false);
    setGameActive(false);
    setIsFlipping(false);
    setHasFlipped(false);
    setAllParitySet(false);
    setBoardLocked(false);
    setFlipCount(0);
    setGameId((current) => current + 1);
  }

  function flipCard() {
    if (isFlipping || hasFlipped) return;

    setIsFlipping(true);
    setHasFlipped(true);

    setFlipCount((current) => current + 1);

    setTimeout(() => {
      setIsFlipping(false);
      setBoardLocked(true);
    }, 1700);
  }

  return (
    <div className="app">
      <Header />

      <div className="app-layout">
        <aside className="app-sidebar">
          <h2>{Constants.welcome}</h2>
          <label className="instructions">
            <p className="how-to">{Constants.howTo}</p>
            <ul className="steps">
              <li>{Constants.step1}</li>
              <li>{Constants.step2}</li>
              <li>{Constants.step3}</li>
              <li>{Constants.step4}</li>
              <li>{Constants.step5}</li>
              <li>{Constants.step6}</li>
              <li>{Constants.step7}</li>
              <li>{Constants.step8}</li>
            </ul>
          </label>

          <details className="instructions-mobile">
            <summary className="how-to">{Constants.howTo}</summary>
            <ul className="steps">
              <li>{Constants.step1}</li>
              <li>{Constants.step2}</li>
              <li>{Constants.step3}</li>
              <li>{Constants.step4}</li>
              <li>{Constants.step5}</li>
              <li>{Constants.step6}</li>
              <li>{Constants.step7}</li>
              <li>{Constants.step8}</li>
            </ul>
          </details>

          <label className="label">
            <p className="btn-label">Grid Size</p>
            <select
              className="select"
              disabled={playDisabled}
              value={selectedSize}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedSize(Number(e.target.value))
              }
            >
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </label>

          <div className="controls-section">
            <button
              className="btn btn-primary"
              onClick={startGame}
              disabled={playDisabled}
            >
              Play
            </button>
            <button
              className="btn btn-primary"
              onClick={resetGame}
              disabled={resetDisabled}
            >
              Reset
            </button>
            <button
              className="btn btn-primary"
              onClick={flipCard}
              disabled={flipDisabled}
            >
              Flip!
            </button>
          </div>
          <div className="topics-desktop">
            <p className="btn-label">Learning Topics</p>
            <Button label="Binary" handleClick={() => handleClick("Binary")} />
            <Button
              label="Parity Bits"
              handleClick={() => handleClick("Parity")}
            />
          </div>
        </aside>

        {isVisible === "Binary" && (
          <InfoCard
            type="Binary"
            info={Constants.binaryInformation}
            handleClose={() => handleClick("")}
          />
        )}

        {isVisible === "Parity" && (
          <InfoCard
            type="Parity Bits"
            info={Constants.parityInformation}
            handleClose={() => handleClick("")}
          />
        )}

        {gameWon && <WinCard handleClose={resetGame} />}

        <main className="game-board">
          <div className={isFlipping ? "game-board--hidden" : ""}>
            <Grid
              key={`${selectedSize}-${gameId}`}
              size={selectedSize}
              gameState={gameActive}
              onParityComplete={setAllParitySet}
              flipCount={flipCount}
              boardLocked={boardLocked}
              onGameWon={(won) => {
                if (won) {
                  setGameWon(true);
                }
              }}
            />
          </div>

          {isFlipping && (
            <div className="board-loader">
              <div className="board-loader-spinner" />
            </div>
          )}
        </main>
        <div className="topics-mobile">
          <p className="btn-label">Learning Topics</p>
          <Button label="Binary" handleClick={() => handleClick("Binary")} />
          <Button
            label="Parity Bits"
            handleClick={() => handleClick("Parity")}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
