const path = require('path')
const express = require('express')
//const { isAbsolute } = require('path')

const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))


const app = express()   // app stores express application
// we can figure our server by using various methods provided on the application itself.

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
 


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Abhinav Ankit'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abhinav Ankit'

    })
})


app.get('/help', (req,res) => {
    res.render('help', {      // we can write 'help.hbs' but only 'help' will work just fine 
        title:'Help',     
        name:'Abhinav Ankit',
        email:'abiiankit@gmail.com'
    })
})

 app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Provide an address'
        })
    }
    const add = req.query.address
    geocode ( add, (error, {location , latitude, longitude} = {} ) => {

        if(error) {
            return res.send({error})  // ES6 object shorthand used
        }

        forecast(latitude, longitude, (forcastError,forecastData) => {
            if(forcastError) {
               return res.send({error: forcastError})
            }

            res.send( {
                location,
                Forecast: forecastData,
                address: add
            })
        })
    })

    //  res.send( {
    //      address: req.query.address,
    //      forecast: 'It is 40 degress outside.'
    //  })
 })


 app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send( {                      // we can also use else instead of return, but this is more common
            error: 'Provide a search term'
        })

    }

     console.log(req.query.search)
     res.send( {
         products:[]
     })
 })


app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'Error 404',
        error: 'Help article not found',
        name: 'Abhinav Ankit'

    })
})


app.get('*', (req,res) => {
    res.render('404', {
        title:'Error',
        error: 'Page not found',
        name: 'Abhinav Ankit'
    })
})


app.listen(port, () => {
    console.log('Server is up on port '+port)
})