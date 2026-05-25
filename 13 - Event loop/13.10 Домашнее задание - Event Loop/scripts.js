function getUserLocation(){
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const button = document.getElementById("btn");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  result.textContent = "Получение координат...";

  getUserLocation()
    .then((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      result.textContent = `Широта: ${latitude}, Долгода: ${longitude}`;
    })
    .catch(() => {
      result.textContent = "Не удалось получить координаты";
    });
});