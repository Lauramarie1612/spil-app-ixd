document.getElementById("citySelect").addEventListener("change", function () {
  const city = this.value;
  if (city) {
    alert(`Du har valgt: ${city.charAt(0).toUpperCase() + city.slice(1)}`);
    // Her kan du fx redirecte til en by-side:
    // window.location.href = `${city}.html`;
  }
});
