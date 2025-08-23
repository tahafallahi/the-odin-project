

const menuItems = [
    "Good Meat  10$",
    "Good Meat  10$",
    "Good Meat  10$",
    "Good Meat  10$",
    "Good Meat  10$",
    "Good Meat  10$",
]

function createMenuPage() {
    const content = document.querySelector("#content"); 
    const container = document.createElement("div");
    
    container.id = "container";
    
    menuItems.forEach(function(element) {
        const item = document.createElement("p");
        item.textContent = element;
        container.appendChild(item);
    });

    content.appendChild(container);
};

export { createMenuPage };
