const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWJpaWFua2l0IiwiYSI6ImNsMXhlYzgweTAxejczanFkd3JoeHc1ZHAifQ.LmoemQT4EWbgaEkey_ndkA&limit=1'

    //request( {url, json: true}, (error,response) => {
    request( {url, json: true}, (error,{body} = {} ) => {
 
        if(error) {
            callback('Unable to connect to geocoding services.', undefined) //  we invoked callback function with this string as
            // argument. What are we going to do with this string string depends on the actual arguments ( callback function)
            // passed when we call geocode.
            // can have different callbacks functions (as argument) in differnt invocation of geocode.
            // Giving us flexibility, reusability, readability
        }
        else if(body.features.length === 0)
        {
            callback('No location found. Try another search.', undefined)
        }
        else{
            callback( undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    } ) 
 }


module.exports = geocode