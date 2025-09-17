let apiKey = "CC4LEK42UTLFYNM8FUJCMQWJP";
let unitGroup = "metric";

function getCoords() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => reject(err)
      );
    } else {
      reject(new Error("Geolocation is not available"));
    }
  });
}

export async function getCurrentWeatherData(city = "") {
  if (city) {
    console.log("cityies");
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?key=${apiKey}&unitGroup=${unitGroup}`
    );
    response = await response.json();
    return response;
  } else {
    let coords = await getCoords();
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${
        coords.lat + "," + coords.lon
      }/today?key=${apiKey}&unitGroup=${unitGroup}`
    );
    response = await response.json();
    return response;
  }
}