let grid = document.querySelector(".grid");
let newGridButton = document.querySelector(".new-grid-button");


const DEFAULT_GRID_SIZE = 20;
const DEFAULT_GRID_WIDTH = 700;
grid.style.width = `${DEFAULT_GRID_WIDTH}px`;
grid.style.height = `${DEFAULT_GRID_WIDTH}px`;

window.onload = function (e) {
        createNewGrid(DEFAULT_GRID_WIDTH, DEFAULT_GRID_SIZE);
};


newGridButton.addEventListener("click", 
    function (e) {
        createNewGrid(DEFAULT_GRID_WIDTH, getNewSize());
});

function createNewGrid(width, size){
    grid.replaceChildren();
    for (let i = 0; i < size**2; i++) {
        let pixel = document.createElement("div");
        pixel.classList.toggle("pixel");
        pixel.style.width = `${width/size}px`;
        pixel.style.height = pixel.style.width;
        pixel.style.opacity = 0;
        pixel.addEventListener("mouseenter", 
            function (event) {
                event.target.style.opacity = Number(event.target.style.opacity) + 0.25; 
            }
        )
        grid.appendChild(pixel)
    }
}

function getNewSize() {
    let size = prompt("Enter Size:");
    if (size > 100 || size < 1) {
        alert("Grid size should be between 0 and 101 pixels!")
        getNewSize()
    }
    return size;
}