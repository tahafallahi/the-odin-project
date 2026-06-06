import { useState } from "react";
import logo from "./assets/logo.png";
import Tiles from "./Tiles.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    {
      if(){
        
      }
    }
      <div className="line">
        <svg
          width="100"
          height="4"
          viewBox="0 0 100 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0 4H0V0H72V4ZM88 4H88V0H100V4Z" fill="#CAB340" />
        </svg>
        <img src={logo} />
      </div>
      <header>
        <p>Generalized Occupational Aptitude Test</p>
        <div className="stats">
          <div className="score-board">
            <p className="score">Score: 0</p>
            <p className="record">Highest Score: 10</p>
          </div>
          <p>Choose each image only once.</p>
        </div>
      </header>
      <main>
        <Tiles />
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

export default App;
