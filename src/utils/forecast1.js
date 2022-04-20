const request = require('request')

const forecast = (latitude , longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e66e0e5177b53134c29d88b8cd332983&query=' +encodeURIComponent(latitude) +',' + encodeURIComponent(longitude)
    request( { url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather services.',undefined)
        }
        else if(response.body.error) {
            callback('Unable to find location. Try other coordinates',undefined)
        }
        else {
            callback(undefined,
            response.body.current.weather_descriptions[0]+'.' +
            ' It is currently '+ response.body.current.temperature +' degress out.'+
            ' It feels like '+ response.body.current.feelslike +' degrees out.')

            // description: response.body.current.weather_descriptions[0],
            // temperature: response.body.current.temperature,
            // feelslike: response.body.current.feelslike

        }
    })
}




module.exports = forecast

