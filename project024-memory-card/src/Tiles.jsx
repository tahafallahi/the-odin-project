import { useState } from "react";

const apiKey = "YpkZR9oWZImaS757WC0qBvWRZjyC88k4";
const limit = 12;
const query = "cat";
const apiLink = "https://api.giphy.com/v1/stickers/search";

async function getGifs() {
  return await fetch(
    `${apiLink}?api_key=${apiKey}&limit=${limit}&q=${query}`,
  ).then((response) => response.json());
}

const responseObject = await getGifs();
const stickers = responseObject.data;
function shuffle(arr) {
  for (let i = arr.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    let k = arr[i];
    arr[i] = arr[j];
    arr[j] = k;
  }
  return arr;
}

export default function Tiles({ handleClickTile, setGameState}) {
  const randomStickers = shuffle(stickers);

  return (
    <div className="tiles" >
      {randomStickers.map((sticker) => <Tile key={sticker.id} sticker={sticker} handleClickTile={handleClickTile} setGameState={setGameState}/>)}
    </div>
  )
}

function Tile({sticker, handleClickTile, setGameState}){
  const [marked, setMarked] = useState(false);

  return (
    <div className="tile" onClick={() => {
      if (marked) {
        setGameState((gameState) => 
        {
          return {
          ...gameState,
          hasLost: true
        }})
      } else {
        setMarked(true)
        handleClickTile()
      }
      }} >
        <img src={sticker.images.fixed_width.webp}></img>
    </div>
  )
}