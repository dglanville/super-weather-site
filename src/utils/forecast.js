const request = require('request')

const forecast = (lat, long, callback) => {

    const url = `https://api.darksky.net/forecast/b25c2347a76b6dd2f32cac41880a3891/${long},${lat}?units=auto`

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            // console.log('Unable to connect to Weather Service 1')
            callback('Unable to connect to Weather Service', undefined)
        } else if (body.error) {
            // console.log('Unable to find location')
            callback('Unable to find location', undefined)
        } else {
            const { temperature, precipProbability, windSpeed, windGust } = body.currently

            const { summary, temperatureHigh, temperatureLow } = body.daily.data[0]


            callback(undefined,`${summary} It is currently ${(temperature).toFixed(0)}° out. There is a ${precipProbability}% of rain. 
            The High & Low Temperature today is ${temperatureHigh}° & ${temperatureLow}° with the current wind and wind gusts at ${windSpeed} 
            & ${windGust}.`)
        }

    })

}

module.exports = forecast