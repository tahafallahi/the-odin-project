const searchForm = document.querySelector("#search-form");
const searchBar = document.querySelector("#search");
const gif = document.querySelector(".gif");

// fetch(
//   "https://api.giphy.com/v1/gifs/translate?api_key=si8hy5PZKfUmVQlTzD6b2L4whxvRln0T&s=cat&weirdness=4"
// )
//   .then((respone) => {
//     return respone.json();
//   })
//   .then((response) => {
//     gif.src = response.data.images.original.url;
//   });

async function fetchData() {
    let response = await fetch("https://api.giphy.com/v1/gifs/translate?api_key=si8hy5PZKfUmVQlTzD6b2L4whxvRln0T&s=cat&weirdness=4");
    response = await response.json();
    gif.src = response.data.images.original.url;
}

async function searchFetchData() {
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=si8hy5PZKfUmVQlTzD6b2L4whxvRln0T&q=${searchBar.value}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
    response = await response.json();
    gif.src = response.data[0].images.original.url;
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchFetchData()
});

fetchData()
