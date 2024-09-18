//! reverse code api finished its trail period so only current location is unavailable 

import express from 'express';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import path from 'path';
// import hbs from 'hbs'
import geoCode from './src/utils/geocode.js'
import forecast from './src/utils/forecast.js'
import reverseGeocode from './src/utils/reverseGeocode.js';

const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const partialsPath = path.join(__dirname,'../views/partials')
// Set the view engine to hbs
app.set('view engine', 'hbs');
// hbs.registerPartial(partialsPath)

// Set the views directory
// app.set('views', path.join(__dirname, 'views'));

//! connecting a static html file 
// const publicDir = path.join(__dirname, '../public');
// app.use(express.static(publicDir));

//! Define a route for the home page
//! second argument is used to pass data from app.js to index.hbs
app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Express App',
        message: 'Hello, Handlebars!'
    });
}); 


app.get('/weather', (req, res) => {
    if (req.query.address) {
        const location = req.query.address;
        geoCode(location, (err, data) => {
            if (err) {
                return res.send({ error: `GeoCode Error: ${err}` });
            }
            forecast(data.latitude, data.longitude, (err, forecastData) => {
                if (err) {
                    return res.send({ error: `Forecast Error: ${err}` });
                }
                res.send({
                    forecast: forecastData,
                    location: data.CityName,
                    address: req.query.address
                });
            });
        });
    } else if (req.query.lat && req.query.lon) {
        const lat = req.query.lat;
        const lon = req.query.lon;
        reverseGeocode(lat, lon, (err, data) => {
            if (err) {
                return res.send({ error: `Reverse Geocode Error: ${err}` });
            }
            forecast(lat, lon, (err, forecastData) => {
                if (err) {
                    return res.send({ error: `Forecast Error: ${err}` });
                }
                res.send({
                    forecast: forecastData,
                    location: data.CityName,
                    address: `Lat: ${lat}, Lon: ${lon}`
                });
            });
        });
    } else {
        res.send({ error: "You must provide an address or coordinates!" });
    }
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: "About page",
        message: "About page got loaded"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "HELP"
    })
})

//! res example and also used to use query string
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide a search item"
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
}
)

// Define a route for a weather page "*" ,(selects all except the mentioned ones)
//! note it should be in last because express matches requests to process this error request
app.get('*', (req, res) => {
    res.render('404page')
})

app.get('/help/*', (req, res) => {
    res.render('help', {
        message: "HELP"
    })
})

app.listen(3000, () => {
    console.log('server connected');
});
