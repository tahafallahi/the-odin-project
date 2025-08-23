

const menuItems = [
    "subscribe to me HONEY !!! I'm Tired and this SANGUINE WAS JUST A good Idea. Who THE FUCK WATNS TO eat human meat And blood in A restrUANNT ???? WHEN THI mother fuckers are so reach",
    "subscribe to me HONEY !!! I'm Tired and this SANGUINE WAS JUST A good Idea. Who THE FUCK WATNS TO eat human meat And blood in A restrUANNT ???? WHEN THI mother fuckers are so reach",
    "subscribe to me HONEY !!! I'm Tired and this SANGUINE WAS JUST A good Idea. Who THE FUCK WATNS TO eat human meat And blood in A restrUANNT ???? WHEN THI mother fuckers are so reach",
    "subscribe to me HONEY !!! I'm Tired and this SANGUINE WAS JUST A good Idea. Who THE FUCK WATNS TO eat human meat And blood in A restrUANNT ???? WHEN THI mother fuckers are so reach",
]

function createSubscribePage() {
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

export { createSubscribePage };
