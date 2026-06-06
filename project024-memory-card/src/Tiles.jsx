import { useEffect, useState } from "react";

const apiKey = "YpkZR9oWZImaS757WC0qBvWRZjyC88k4";
const limit = 3;
const query = "cat";
const apiLink = "https://api.giphy.com/v1/stickers/search";

async function getGifs() {
  return await fetch(
    `${apiLink}?api_key=${apiKey}&limit=${limit}&q=${query}`,
  ).then((response) => response.json());
}

const responseObject = await getGifs();
const stickers = responseObject.data;
let gifs = [];

stickers.forEach((sticker) => getGIF(sticker));
async function getGIF(sticker) {
  const gif = await fetch(sticker.images.original.url).then((response) =>
    response.blob(),
  );
  gifs.push(URL.createObjectURL(gif));
}

export default function Tiles() {
  console.log(gifs);

  return <img src={gifs[0]}></img>;
}
