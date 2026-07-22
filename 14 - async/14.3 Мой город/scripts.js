function getMyCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

async function getMyCity() {
  try {
    const { latitude, longitude } = await getMyCoordinates();

    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    );

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
    console.log(`Город: ${data.city || data.locality}`);
  } catch (error) {
    console.error(error);
  }
}

getMyCity();