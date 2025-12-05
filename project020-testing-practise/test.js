const {
  calculator,
  capitilize,
  reverseString,
  caesarCipher,
  analizeArray,
} = require("./source");

test("inputs hello, expects Hello", () => {
  expect(capitilize("hello")).toBe("Hello");
});

test("inputs hello, expects olleh", () => {
  expect(reverseString("hello")).toBe("olleh");
});

test("adds 2 + 2 to equal 4", () => {
  expect(calculator.add(2, 2)).toBe(4);
});

test("multiply 2 and 3 to equal 6", () => {
  expect(calculator.multiply(2, 3)).toBe(6);
});

test("subract 10 from 20 to equal -10", () => {
  expect(calculator.subtract(10, 20)).toBe(-10);
});

test("adds 10 by 2 to equal 5", () => {
  expect(calculator.divide(10, 2)).toBe(5);
});

test("cipher xyz to abc with shift of 3 ", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc");
});

test("cipher hello to hello with shift of 26 ", () => {
  expect(caesarCipher("hello", 26)).toBe("hello");
});

test("cipher Hello, How are you?! to Rovvy, Ryg kbo iye?! with shift of 10 ", () => {
  expect(caesarCipher("Hello, How are you?!", 10)).toBe("Rovvy, Ryg kbo iye?!");
});

test("array [1,8,3,4,2,6] should return [avg: 4, min: 1. max: 8, length: 6]", () => {
  expect(analizeArray([1, 8, 3, 4, 2, 6])).toStrictEqual({
    avg: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});
