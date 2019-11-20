const request = require('request')
const mapboxToken = 'n=pk.eyJ1IjoiZGdsYW52aWxsZSIsImEiOiJjazJ1anZ1bW0xNnBxM2Nwcm1obThqbmozIn0.xj1JLsN_LPIKH0UgKKT54g'

const goecode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_toke${mapboxToken}&limit=1`
  
    request({ url, json: true }, (error, { body } ) => {
  
      if (error) {
        console.log('1 error')
        console.log(error)
        callback('Unable to connection to Location Services', undefined)
      } else if (body.features.length < 1) {
        console.log('2 error')
        console.log(body.features.length)
        callback('Unable to find location. Try another search.', undefined)
      } else {
        callback(undefined, {
          latitude: body.features[0].center[0],
          longitude: body.features[0].center[1],
          location: body.features[0].place_name
        })
  
  
      }
  
    })
  
  }
module.exports = goecode
