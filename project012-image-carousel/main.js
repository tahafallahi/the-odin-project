const imageCarousel = document.querySelector(".image-carousel");
const imageIndicators = document.querySelector(".image-indicators");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

const totalImages = document.querySelectorAll(".image-carousel img").length;
const imageIndicatorsArray = Array.from(imageIndicators.children);
let imageNumber = 0;

imageIndicators.children[imageNumber].style = `font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24`;
let delayTime = 5000;

function changeImage() {
  setInterval(() => {
    setImage(imageNumber + 1);
  }, delayTime);
}

function setImage(num) {
  imageNumber = num % totalImages;
  imageCarousel.style.marginLeft = `-${imageNumber * 375}px`;
  setCircle();
}

function setCircle() {
  imageIndicatorsArray.forEach(
    (n) => (n.style.fontVariationSettings = "'FILL' 0")
  );
  imageIndicators.children[imageNumber].style.fontVariationSettings =
    "'FILL' 1";
}

imageIndicatorsArray.forEach((n) => {
  n.addEventListener("click", () => {
    imageNumber = imageIndicatorsArray.indexOf(n);
    setImage(imageNumber);
    setCircle();
  });
});

arrowLeft.addEventListener("click", () => {
  if (imageNumber == 0) {
    imageNumber = totalImages - 1;
  } else {
    imageNumber--;
  }
  setImage(imageNumber);
  setCircle();
});

arrowRight.addEventListener("click", () => {
  if (imageNumber == totalImages - 1) {
    imageNumber = 0;
  } else {
    imageNumber++;
  }
  setImage(imageNumber);
  setCircle();
});

changeImage();
