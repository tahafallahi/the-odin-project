const form = document.querySelector("form");

function formConstraints() {
  const emailInput = form.querySelector("#email");
  const fullnameInput = form.querySelector("#fullname");
  const passwordInput = form.querySelector("#password");
  const passwordConfirmationInput = form.querySelector("#password2");

  emailInput.addEventListener("input", (e) => {
    const value = e.target.value;
    emailInput.setCustomValidity(
      !value.includes("@") ? "Please use a valid email address." : "",
    );
  });

  fullnameInput.addEventListener("input", (e) => {
    const value = e.target.value;
    fullnameInput.setCustomValidity(
      value.length < 1 || value.length > 101
        ? "Fullname must be between 0 and 100 characters."
        : "",
    );
  });

  passwordInput.addEventListener("input", (e) => {
    const value = e.target.value;
    passwordInput.setCustomValidity(
      value.length < 8 || value.length > 72
        ? "Password must be between 8 and 72 characters."
        : "",
    );
  });

  passwordConfirmationInput.addEventListener("input", (e) => {
    const value = e.target.value;
    passwordConfirmationInput.setCustomValidity(
      value != passwordInput.value ? "Passwords don't match" : "",
    );
  });
}

formConstraints();
