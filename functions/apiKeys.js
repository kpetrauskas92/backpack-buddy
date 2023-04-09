const weatherApiKey = process.env.WEATHER_API_KEY;
const openCageApiKey = process.env.OPEN_CAGE_API_KEY;

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      weatherApiKey: weatherApiKey,
      openCageApiKey: openCageApiKey,
    }),
  };
};