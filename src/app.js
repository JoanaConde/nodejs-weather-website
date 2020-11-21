const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname, '../public'))

const app = express()
// process.env.PORT will fetch heroku port to run the app
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')  // if I call something else diferent from views to the views folder in the root of the project
const partialsPath = path.join(__dirname, '../templates/partials')

// Customize server: static pages
//Setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)  // And I need to setup this to work
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Joana Conde'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Joana Conde'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a helpfull text!',
        title: 'Help',
        name: 'Joana Conde'
    })
})

//app.com
//app.com/help
//app.com/about

//define original root page
/* app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
}) 

app.get('/help', (req, res) => {
    res.send({
        forecast: 'something',
        location: 'Aveiro'
    })
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})*/

// /weather?address=porto%20portugal
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {location, lat, lon} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(lat, lon, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
    
            res.send({
                forecast: forecastData,
                location,  //location: location,
                address: req.query.address
            })
        })
    })

    
})

///products?search=something
app.get('/products', (req,res) => {
    if (!req.query.search) {
        return response.send({
            error: 'you must provide a serch term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
} )

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Joana Conde',
        errorMsg: 'Help article not found'
    })
})

// match everything else
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Joana Conde',
        errorMsg: 'Page not found'
    })
})

// run server
app.listen(port, () => {
    console.log('Server is up on port ' + port +'.')
})