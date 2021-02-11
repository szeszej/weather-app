const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ba9d10fcb561e8f08bac12df4da64d40&query=${latitude},${longitude}`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!')
    } else if (body.error) {
      callback(body.error.info)
    } else {
      const { weather_descriptions, temperature, precip } = body.current
      callback(
        null,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees out. There is ${precip}% chance of rain.`,
      )
    }
  })
}

module.exports = forecast
