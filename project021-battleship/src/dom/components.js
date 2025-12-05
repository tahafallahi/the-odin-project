function createButton(text, onClick, classes) {
  let btn = document.createElement("button");
  btn.textContent = text;
  btn.classList.add(classes);
  if (onClick) btn.addEventListener("click", onClick);
  return btn;
}

function createSkewButton(text, onClick, classes) {
  let btn = document.createElement("button");
  let span = document.createElement("span");
  btn.classList.add(classes);
  btn.classList.add("skew-btn");
  span.classList.add("skew-btn-text");
  span.textContent = text;
  btn.appendChild(span);
  if (onClick) btn.addEventListener("click", onClick);
  return btn;
}

function createFlexRowDiv(...elements) {
  let div = document.createElement("div");
  div.classList.add("flex-row-container");
  div.append(...elements);
  return div;
}

function createDiv(...elements) {
  let div = document.createElement("div");
  div.append(...elements);
  return div;
}

function createFlexColDiv(...elements) {
  let div = document.createElement("div");
  div.classList.add("flex-col-container");
  div.append(...elements);
  return div;
}

function createContinerDiv(...elements) {
  let div = document.createElement("div");
  div.classList.add("flex-col-container");
  div.classList.add("container");
  div.append(...elements);
  return div;
}

function createH1(text) {
  let h1 = document.createElement("h1");
  h1.textContent = text;
  h1.classList.add("title");
  return h1;
}

function createH2(text) {
  let h2 = document.createElement("h2");
  h2.textContent = text;
  return h2;
}

function createH3(text) {
  let h3 = document.createElement("h2");
  h3.textContent = text;
  return h3;
}

function createForm(onSubmit, ...elements) {
  let form = document.createElement("form");
  form.append(...elements);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    onSubmit(Object.fromEntries(formData));
  });
  return form;
}

function createTextInput(labelText, name, placeholder) {
  let label = document.createElement("label");
  label.textContent = labelText;
  label.htmlFor = name;
  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholder;
  input.id = name;
  input.name = name;
  let container = createFlexColDiv(label, input);
  return container;
}

function createCheckBoxGrid(...labelTexts) {
  let grid = document.createElement("div");
  labelTexts.forEach((labelText) => {
    let div = document.createElement("div");
    let label = document.createElement("label");
    label.for = labelText;
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = labelText;
    checkBox.name = labelText;
    div.append(checkBox, label);
    grid.appendChild(div);
  });
  return grid;
}

function createRadioBox(legendText, name, buttons) {
  let fieldset = document.createElement("fieldset");
  let legend = document.createElement("legend");
  legend.textContent = legendText;
  fieldset.appendChild(legend);

  for (const [btnName, btnText] of Object.entries(buttons)) {
    let div = document.createElement("div");
    div.classList.add("radio-box-div");

    let label = document.createElement("label");
    label.htmlFor = btnName;
    label.innerHTML = btnText;

    let radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.id = btnName;
    radioBtn.value = btnName;
    radioBtn.name = name;
    div.append(radioBtn, label);
    fieldset.appendChild(div);
  }
  fieldset.querySelector("input").setAttribute("checked", "");
  return fieldset;
}

function createGameBoard(player) {
  let grid = document.createElement("div");
  grid.classList.add("game-board");
  grid.dataset.player = player;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = createDiv()
      cell.dataset.cord = `${i}${j}`
      grid.appendChild(cell);
    }
  }

  return grid;
}

export {
  createButton,
  createSkewButton,
  createFlexRowDiv,
  createFlexColDiv,
  createH1,
  createContinerDiv,
  createForm,
  createTextInput,
  createCheckBoxGrid,
  createRadioBox,
  createDiv,
  createGameBoard,
  createH2,
  createH3,
};
