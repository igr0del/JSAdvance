const buttons = document.querySelectorAll(".counter-button");
const clickCountElement = document.getElementById("click-count");

let clickCount = 0;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((currentButton) =>{
      currentButton.textContent = "Нажми меня";
      currentButton.classList.remove("is-active");
    });

    button.textContent = "Нажата!";
    button.classList.add("is-active");

    clickCount += 1;
    clickCountElement.textContent = clickCount;
  });
});