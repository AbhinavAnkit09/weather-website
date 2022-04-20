const request = require('request')

const forecast = (latitude , longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e66e0e5177b53134c29d88b8cd332983&query=' +encodeURIComponent(latitude) +',' + encodeURIComponent(longitude)
    //request( { url, json: true}, (error, response) => {
    request( { url, json: true}, (error, {body} = {} ) => {    
        
        if(error) {
            callback('Unable to connect to weather services.',undefined)
        }
        else if(body.error) {
            callback('Unable to find location. Try other coordinates',undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0]+'.' +
            ' It is currently '+ body.current.temperature +' degress out.'+
            ' It feels like '+ body.current.feelslike +' degrees out.')

        }
    })
}




module.exports = forecast

