const key = document.querySelectorAll(".key");
const text = document.querySelector(".text")

key.forEach(function (key) {
    key.addEventListener("click", function (e) {
        if (text.textContent == '0') text.textContent = '';
        if (e.target.classList.contains("number")){
            text.textContent += e.target.textContent;
        } else if (e.target.classList.contains("operator")){
            text.textContent += e.target.textContent;
        } else if (e.target.classList.contains("result")){
            text.textContent = caculate(text.textContent);
        } else if (e.target.classList.contains("backspace")) {
            text.textContent = text.textContent.slice(0, text.textContent.length - 1)
        }
    })
});

function caculate(str) {
    if (str.includes("+")) {
        return Number(str.slice(0, str.indexOf('+'))) +
        Number(str.slice(str.indexOf("+")+1));
    } else if (str.includes("-")) {
        console.log("heloo")
        return Number(str.slice(0, str.indexOf('-'))) -
            Number(str.slice(str.indexOf("-")+1));
    } else if (str.includes("*")) {
        return Number(str.slice(0, str.indexOf('*'))) *
            Number(str.slice(str.indexOf("*")+1));
    } else if (str.includes("/")) {
        return Number(str.slice(0, str.indexOf('/'))) /
            Number(str.slice(str.indexOf("/")+1));
    };
}