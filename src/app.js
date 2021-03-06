const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather Status',
        name: 'Wendy'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Wendy'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'This project is only for learning purposes. Please don\'t contact me if you need any help. ',
        title: 'Help Page',
        name: 'Wendy'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error});
            }
            res.send({
                ...forecastData,
                location,
                address: req.query.address,
            });
        });
    });
});

app.get('/my-location', (req, res) => {
    const { latitude, longitude } = req.query
    forecast(latitude, longitude, (error, forecastData) => {
        if (error){
            return res.send({ error });
        }
        res.send(forecastData);
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Wendy',
        errorMessage: 'Help article not found.'
    });
});

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Wendy',
        errorMessage: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server is up on port '+port);
});