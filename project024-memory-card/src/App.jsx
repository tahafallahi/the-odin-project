import { useState } from "react";

import logo from "./assets/logo.png";
import Tiles from "./Tiles.jsx";
import Anouncement from "./Anouncement.jsx";

function App() {
  const [gameState, setGameState] = useState({
    currentScore: 0,
    heighestScore: 0,
    hasLost: false,
  })

  function handleClickTile() {
    console.log("cilcked");
    setGameState({
      ...gameState,
      currentScore: gameState.currentScore + 1,
      heighestScore: gameState.currentScore + 1 > gameState.heighestScore ? gameState.currentScore + 1 : gameState.heighestScore
    })
  }

  if (gameState.currentScore >= 12) {
      setTimeout(() => {
        setGameState({
        currentScore: 0,
        heighestScore: gameState.currentScore > gameState.heighestScore ? gameState.currentScore: gameState.heighestScore,
        hasLost: false
        })
      }, 2000);
      return (
    <>
      <header>
        <p>Generalized Occupational Aptitude Test</p>
      <div className="line">
        <svg
          width="100"
          height="4"
          viewBox="0 0 100 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0 4H0V0H75V4ZM80 4H80V0H100V4Z" fill="#CAB340" />
        </svg>
        <img src={logo} />
      </div>
        <div className="stats">
          <div className="score-board">
            <p className="score">Score: {gameState.currentScore}</p>
            <p className="record">Highest Score: {gameState.heighestScore}</p>
          </div>
          <p>Choose each image only once.</p>
        </div>
      </header>
      <main>
        <Anouncement>YOU LOST!</Anouncement>
      </main>
      <footer>
        <svg
          width="100"
          height="4"
          viewBox="0 0 100 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0 4H0V0H100V4Z" fill="#CAB340" />
        </svg>
        <p>
          Sub optimal performance will result in immediate initiation of your
          the termination procedure.
        </p>
      </footer>
    </>
  );
    } else if (gameState.hasLost) {
      setTimeout(() => {
        setGameState({
        currentScore: 0,
        heighestScore: gameState.currentScore > gameState.heighestScore ? gameState.currentScore: gameState.heighestScore,
        hasLost: false
        })
      }, 2000);
      return (
    <>
      <header>
        <p>Generalized Occupational Aptitude Test</p>
      <div className="line">
        <svg
          width="100"
          height="4"
          viewBox="0 0 100 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0 4H0V0H75V4ZM80 4H80V0H100V4Z" fill="#CAB340" />
        </svg>
        <img src={logo} />
      </div>
        <div className="stats">
          <div className="score-board">
            <p className="score">Score: {gameState.currentScore}</p>
            <p className="record">Highest Score: {gameState.heighestScore}</p>
          </div>
          <p>Choose each image only once.</p>
        </div>
      </header>
      <main>
        <Anouncement>YOU LOST!</Anouncement>
      </main>
      <footer>
        <svg
          width="100"
          height="4"
          viewBox="0 0 100 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0 4H0V0H100V4Z" fill="#CAB340" />
        </svg>
        <p>
          Sub optimal performance will result in immediate initiation of your
          termination procedure.
        </p>
      </footer>
    </>
  );
    } else {
      return (
    <>
      <header>
        <p>Generalized Occupational Aptitude Test</p>
      <div className="line">
        <svg
          width="100"
          height="4"
          viewBox="0 0 100 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0 4H0V0H75V4ZM80 4H80V0H100V4Z" fill="#CAB340" />
        </svg>
        <img src={logo} />
      </div>
        <div className="stats">
          <div className="score-board">
            <p className="score">Score: {gameState.currentScore}</p>
            <p className="record">Highest Score: {gameState.heighestScore}</p>
          </div>
          <p>Choose each image only once.</p>
        </div>
      </header>
      <main>
        <Tiles handleClickTile={handleClickTile} setGameState={setGameState}/>
      </main>
      <footer>
        <svg
          width="100"
          height="4"
          viewBox="0 0 100 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0 4H0V0H100V4Z" fill="#CAB340" />
        </svg>
        <p>
          Sub optimal performance will result in immediate initiation of your
          the termination procedure.
        </p>
      </footer>
    </>
  );
  }
}

export default App;
