function capitilize(string) {
  return string.replace(string[0], string[0].toUpperCase());
}

function reverseString(string) {
  return string.split("").reverse().join("");
}

let calculator = (function () {
  const add = (a, b) => a + b;
  const multiply = (a, b) => a * b;
  const subtract = (a, b) => a - b;
  const divide = (a, b) => a / b;
  return { add, multiply, subtract, divide };
})();

function caesarCipher(string, shift) {
  string = string.split("");
  string = string.map((letter) => {
    if (letter.match(/[a-z]/g)) {
      return String.fromCharCode(
        ((letter.charCodeAt(0) - 97 + shift) % 26) + 97
      );
    } else if (letter.match(/[A-Z]/g)) {
      return String.fromCharCode(
        ((letter.charCodeAt(0) - 65 + shift) % 26) + 65
      );
    } else {
        return letter
    }
  });
  return string.join("");
}

function analizeArray(array) {
    return {
        "avg": array.reduce((sum, num) => sum + num) / array.length,
        "min": Math.min(...array),
        "max": Math.max(...array),
        "length": array.length,
    }
}

module.exports = { capitilize, reverseString, calculator, caesarCipher, analizeArray };
