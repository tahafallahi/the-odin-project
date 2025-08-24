import { createHomePage } from "./home";
import { createMenuPage } from "./menu";
import { createSubscribePage } from "./subscribe";
import "./style.css"

const content = document.querySelector("#content")
const nav = document.querySelector("nav");

createHomePage();
nav.children[0].classList.add("clicked")


nav.addEventListener("click", function(element) {
    content.innerHTML = "";
    switch (element.target.id){
        case "home-button":
            createHomePage();
            Array.from(nav.children).forEach(n => n.classList.remove("clicked"));
            nav.children[0].classList.add("clicked")
            break;
        case "menu-button":
            createMenuPage();
            Array.from(nav.children).forEach(n => n.classList.remove("clicked"));
            nav.children[1].classList.add("clicked")
            break;
        case "subscription-button":
            createSubscribePage();
            Array.from(nav.children).forEach(n => n.classList.remove("clicked"));
            nav.children[2].classList.add("clicked")
            break;
    }
});
