import "./style.css";

import "./todo.js";

const livePreview = document.querySelector(".live-preview");

const inputsColor = document.querySelectorAll("input[type=color]");

console.log(inputsColor);

inputsColor.forEach((oneInput) => {
  oneInput.addEventListener("change", (event) => {
    const rgbValue = hexToRgb(event.target.value);

    const idInput = event.target.id;

    switch (idInput) {
      case "color1":
        livePreview.style.setProperty(
          "--text",
          `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`
        );
        break;
      case "color2":
        livePreview.style.setProperty(
          "--background",
          `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`
        );
        break;
      case "color3":
        livePreview.style.setProperty(
          "--primary",
          `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`
        );
        break;
      case "color4":
        livePreview.style.setProperty(
          "--secondary",
          `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`
        );
        break;
      case "color5":
        livePreview.style.setProperty(
          "--accent",
          `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`
        );
        break;

      default:
        break;
    }
  });
});

function hexToRgb(hex) {
  return {
    r: parseInt(hex.substring(1, 3), 16),
    g: parseInt(hex.substring(3, 5), 16),
    b: parseInt(hex.substring(5, 7), 16),
  };
}
