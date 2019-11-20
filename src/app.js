const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


const goecode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dorian Glanville'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Dorian Glanville'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'How can we help?',
        message: 'Theres nothing better than a Apple a day !',
        name: 'Dorian Glanville'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provider an address.'
        })
    }

    goecode(req.query.address, (error, { longitude, latitude, location } = {} ) => {

        if (error) {
            console.log(`ERROR: ${error}`)
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forcastData) => {

            if (error) {
                console.log(`ERROR: ${error}`)
                return res.send({
                    error: error
                })
                
            }

            res.send({
                location: location,
                forecast: forcastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query)

    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {

    res.render('404', {
        title: 'Help Article Not Found ',
        message404: '404 Page Not Found',
        name: 'Dorian Glanville'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message404: '404 Page Not Found',
        name: 'Dorian Glanville'
    })
})

app.listen(port, () => {
    console.log(`Express Server is up on port ${port}`)
})

