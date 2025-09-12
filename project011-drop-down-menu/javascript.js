const dropDownBtn = document.querySelector(".drop-down-button");
const dropDownContent = document.querySelector(".drop-down-content");
dropDownContent.classList.toggle("invisible");

dropDownBtn.addEventListener("mouseover", () => {
  dropDownContent.classList.toggle("invisible");
});
