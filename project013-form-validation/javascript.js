const signUp = document.querySelector(".sign-up");
const inputs = document.querySelectorAll(".sign-up input, select");
const pass = document.querySelector("#password");
const confirmPass = document.querySelector("#password-confirm");

inputs.forEach((element) => {
  element.addEventListener("input", () => {
    if (!element.checkValidity()) element.reportValidity();
  });
});

signUp.addEventListener("submit", (event) => {
  event.preventDefault();
  inputs.forEach((element) => {
    element.reportValidity();
  });
    });

confirmPass.addEventListener("input", () => {
  if (pass.value != confirmPass.value) {
    confirmPass.setCustomValidity("Passwords do not match.");
  } else {
    confirmPass.setCustomValidity("");
  }
});
