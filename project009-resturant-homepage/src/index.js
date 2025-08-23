import { createHomePage } from "./home";
import { createMenuPage } from "./menu";
import { createSubscribePage } from "./subscribe";
import "./style.css"

const content = document.querySelector("#content")
const nav = document.querySelector("nav");

nav.addEventListener("click", function(element) {
    content.innerHTML = "";
    switch (element.target.id){
        case "home-button":
            createHomePage();
            break;
        case "menu-button":
            createMenuPage();
            break;
        case "subscription-button":
            createSubscribePage();
            break;
    }
});
