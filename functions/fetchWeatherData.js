const fetch = require("node-fetch");

const weatherApiKey = process.env.WEATHER_API_KEY;
const openCageApiKey = process.env.OPEN_CAGE_API_KEY;

exports.handler = async function (event, context) {
  const { latitude, longitude } = JSON.parse(event.body);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherApiKey}`
    );
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Error fetching weather data." }),
      };
    }
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching weather data." }),
    };
  }
};