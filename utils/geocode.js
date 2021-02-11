const request = require('request')

const geoCode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location,
  )}.json?access_token=pk.eyJ1Ijoic3plc3plaiIsImEiOiJja2t4eDd1dGQwYTQ1MzFtb2FqdDVkNHJuIn0.8Em6vVPf8W0pSVlQuR_8bw&limit=1`
  request({ url, json: true }, (error, { body }) => {
    console.log(body)
    if (error) {
      callback('Unable to connect to location service!')
    } else if (body.features.length === 0) {
      callback('Location not found!')
    } else {
      const location = body.features[0].place_name
      const latitude = body.features[0].center[1]
      const longitude = body.features[0].center[0]
      callback(null, {
        location,
        latitude,
        longitude,
      })
    }
  })
}

module.exports = geoCode
