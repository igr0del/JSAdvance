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
    const { latitude, longitude } = await getMyCordinates();
    
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    );
    
    if (!responce.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const data = await responce.json();

    console.log(data);
    console.log(`Город: ${data.city || data.locality}`);
  } catch(error) {
    console.error(error);
  }
}

getMyCity()