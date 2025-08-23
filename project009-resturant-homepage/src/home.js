import "./home.css"

class Data {
    static texts = {
        introduction: `We provide you with the best humane food. Don't fret!
                        Our methods are completly legal!`, 
        hours: {
            0: `Weekdays: 10pm - 8am`,
            1: `Weekends: 5pm - 6am`,
        },
        location: `Livertagia, Southern block, Soggy St.`,
        concerns: `* If you have any conerns relating our food gathering methods,
                    please <a href="sdf">click here</a>.`,
    };
};

function createHomePage() {
    const content = document.querySelector("#content"); 
    const container = document.createElement("div");
    const introduction = document.createElement("p");
    const hours = document.createElement("ul");
    const location = document.createElement("p");
    const concerns = document.createElement("p");
    
    container.id = "container";
    
    for (let i = 0; i < 2; i++) {
        const li = document.createElement("li");
        li.textContent = Data.texts.hours[i];
        hours.appendChild(li)     
    };
    introduction.textContent = Data.texts.introduction;
    location.textContent = Data.texts.location;
    concerns.innerHTML = Data.texts.concerns;
    

    container.append(...[introduction, hours, location, concerns]);
    content.appendChild(container);
};

export { createHomePage };
