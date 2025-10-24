document.getElementById("citySelect").addEventListener("change", function () {
  const city = this.value;

  if (city) {
    window.location.href = "spilside.html";
  }
});

