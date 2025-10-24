// Gør at logoet "popper" lidt når man klikker på det
const logo = document.querySelector(".logo-circle");

logo.addEventListener("click", () => {
  logo.classList.add("bounce");
  setTimeout(() => logo.classList.remove("bounce"), 400);
});
