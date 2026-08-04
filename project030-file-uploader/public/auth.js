const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const password2Input = document.querySelector("#password2");

usernameInput.addEventListener("input", () => {
  const value = usernameInput.value;

  usernameInput.setCustomValidity(
    value.length < 3 ? "Username must be longer than 3 charachters." : "",
  );
});

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;

  passwordInput.setCustomValidity(
    value.length < 8 ? "Passowrd must be longer than 8 charachters." : "",
  );
});

password2Input.addEventListener("input", () => {
  const value = password2Input.value;

  password2Input.setCustomValidity(
    value != passwordInput.value ? "Passowrd doesn't match." : "",
  );
});
