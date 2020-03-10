export const weatherIconApiEndpoint = 'https://api.met.no/weatherapi/weathericon/1.1?content_type=image%2Fpng&symbol=';

export const locationForecastApiEndpoint = (latitude, longitude) =>
  `https://cors-anywhere.herokuapp.com/https://api.met.no/weatherapi/locationforecast/1.9/.json?lat=${latitude}&lon=${longitude}`;

export const toponymSearchApiEndpoint = name =>
  `https://ws.geonorge.no/SKWS3Index/ssr/json/sok?navn=${name}&epsgKode=4230`;

export default {
  weatherIconApiEndpoint,
  locationForecastApiEndpoint,
  toponymSearchApiEndpoint
};
