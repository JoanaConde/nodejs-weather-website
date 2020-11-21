const request = require('postman-request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=14f39e2208a56512cdc9f84dc0d88690&query=' + lat + ',' + lon

    //console.log(url)
    //request({url: url, json: true}, (error, response) => {
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather forecast service', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. There is a ' 
            + body.current.precip +'% chance of rain. Humidity: ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast