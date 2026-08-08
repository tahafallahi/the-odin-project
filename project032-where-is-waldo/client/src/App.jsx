import { useRef, useState } from "react";
import { Check, X } from "lucide-react";

import background from "./assets/background.jpg";
import roboBrain from "./assets/robo-brain.png";
import guts from "./assets/guts.png";
import godOfWar from "./assets/god-of-war.png";
import sonic from "./assets/sonic.png";
import waldo from "./assets/waldo.png";

function App() {
  const imgRef = useRef();
  const [menuIsShown, setMenuIsShown] = useState(false);
  const [selectionIsShown, setSelectionIsShown] = useState(false);
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [buttons, setButtons] = useState([
    "Robo Brain",
    "Guts",
    "God of War",
    "Sonic",
    "Waldo",
  ]);

  function handleClick(e) {
    // console.log(imgRef.current.clientWidth);
    const position = [
      ((e.pageX / imgRef.current.clientWidth) * 1000).toFixed(0),
      ((e.pageY / imgRef.current.clientHeight) * 1000).toFixed(0),
    ];

    setMousePosition([
      `${(e.pageX / window.innerWidth) * 100}vw`,
      `${(e.pageY / window.innerHeight) * 100}vh`,
    ]);

    console.log(position);

    setMenuIsShown(position);
  }

  async function handleSelection(e) {
    let result = await fetch(
      `http://localhost:3333?name=${e.target.innerText}&x=${menuIsShown[0]}&y=${menuIsShown[1]}`,
    );
    result = await result.json();
    console.log(menuIsShown);
    console.log(result);

    setMenuIsShown(false);
    setSelectionIsShown(true);
    setTimeout(() => {
      setSelectionIsShown(false);
      if (result.location) {
        setCorrectGuesses([...correctGuesses, mousePosition]);
        setButtons(buttons.filter((b) => b !== e.target.innerText));
      }
    }, 1000);
  }
  if (buttons.length > 0) {
    return (
      <>
        <div className="hud">
          <p>Find them in the picture.</p>
          <div className="pictures">
            <div>
              <div className="img-container">
                <img src={roboBrain} alt="" />
              </div>

              <p>Robo Brain</p>
            </div>
            <div>
              <div className="img-container">
                <img src={guts} alt="" />
              </div>
              <p>Guts</p>
            </div>
            <div>
              <div className="img-container">
                <img src={godOfWar} alt="" />
              </div>
              <p>God of War</p>
            </div>
            <div>
              <div className="img-container">
                <img src={waldo} alt="" />
              </div>
              <p>Waldo</p>
            </div>
            <div>
              <div className="img-container">
                <img src={sonic} alt="" />
              </div>
              <p>Sonic</p>
            </div>
          </div>
        </div>
        <img
          className="background"
          onClick={handleClick}
          ref={imgRef}
          src={background}
          alt=""
        />
        {menuIsShown ? (
          <>
            <div
              className="menu"
              onClick={handleSelection}
              style={{ top: mousePosition[1], left: mousePosition[0] }}
            >
              {buttons.length > 0
                ? buttons.map((b, i) => <button key={i}>{b}</button>)
                : null}
            </div>
          </>
        ) : null}

        {selectionIsShown ? (
          <div
            className="selection"
            style={{ top: mousePosition[1], left: mousePosition[0] }}
          ></div>
        ) : null}
        {correctGuesses.length > 0
          ? correctGuesses.map((mousePosition) => (
              <div
                key={mousePosition[0]}
                className="tick"
                style={{ top: mousePosition[1], left: mousePosition[0] }}
              ></div>
            ))
          : null}
      </>
    );
  } else {
    return (
      <>
        <img
          className="background"
          onClick={handleClick}
          ref={imgRef}
          src={background}
          alt=""
        />
        <div className="message">
          <p>You Have Won</p>
        </div>
      </>
    );
  }
}

export default App;
