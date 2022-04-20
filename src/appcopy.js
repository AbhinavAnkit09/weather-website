const path = require('path')
const express = require('express')
const { isAbsolute } = require('path')

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))


const app = express()   // app stores express application
// we can figure our server by using various methods provided on the application itself.

const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

//this wont load because of presence of index.html and base route is already served
//  app.get('', (req,res) => {             
//      //res.send('Hello express!')
//      res.send('<h1>Weather</h1>')
//  })

//  app.get('/help', (req,res) => {
//      //res.send('Help page')
//      res.send( {
//          name:'Abhinav',
//          age:22
//      })

//  })


//  app.get('/about' ,(req,res) => {
//      //res.send('About')
//         res.send('<h1>About</h1>')
//  })



 app.get('/weather', (req,res) => {
     //res.send('Your Weather')
     res.send( {
         Location: 'Patna',
         forecast: 'It is 40 degress outside.'
     })
 })

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})