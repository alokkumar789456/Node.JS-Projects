//! weather APP
//! using http //weatherStack //here
// import http from 'postman-request'
import geoCode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";

// let url_1 = 'http://api.weatherstack.com/current?access_key=be96af46d93f1da96570cb84de137db7&query=Invalidenstr+117+Berlin'
// http(url_1, (error, response, body) => {
//     if (error) {
//         console.error('Error:', error);
//     } else if (response.statusCode !== 200) {
//         console.error('Failed to fetch data. Status code:', response.statusCode);
//     } else {
//         let data = JSON.parse(body);
//         console.log('Temperature: ', data.current.temperature);
//         console.log('Humidity: ', data.current.humidity)
//     }
// });

//! using http //hereapi //here
// let url_2 = 'https://geocode.search.hereapi.com/v1/geocode?q=Invalidenstr+117+Berlin&apiKey=PNTq3X_nNHxvCFaON31PTHFD6FGfFKsmJVWl8mmpngg';
// http(url_2, (error, response, body) => {
//     if (error) {
//         console.log('Error:', error);
//     } else if (response.statusCode !== 200) {
//         console.log('Failed to fetch data. Status code:', response.statusCode);
//     } else {
//         let data = JSON.parse(body);
//         if (data.items && data.items.length > 0) {
//             let item = data.items[0];
//             console.log('City Name:', item.address.city);
//             console.log('Latitude:', item.position.lat);
//             console.log('Longitude:', item.position.lng);
//         } else {
//             console.log('No items found in the response.');
//         }
//     }
// });

//! or  let data = JSON.parse(body); => {url:url_2,json:true} ,  let data = body
// let url_2 = 'https://geocode.search.hereapi.com/v1/geocode?q=Invalidenstr+117+Berlin&apiKey=PNTq3X_nNHxvCFaON31PTHFD6FGfFKsmJVWl8mmpngg';
// http({url:url_2,json:true}, (error, response, body) => {
//     if (error) {
//         console.log('Error:', error);
//     } else if (response.statusCode !== 200) {
//         console.log('Failed to fetch data. Status code:', response.statusCode);
//     } else {
//         let data = body
//         if (data.items && data.items.length > 0) {
//             let item = data.items[0];
//             console.log('City Name:', item.address.city);
//             console.log('Latitude:', item.position.lat);
//             console.log('Longitude:', item.position.lng);
//         } else {
//             console.log('No items found in the response.');
//         }
//     }
// });

//! url parsing and giving the required loaction in url
//! q=Invalidenstr+117+Berlin //you can acces only this one because you dont have subcription

//! done in geocode.js

// geoCode('Invalidenstr+117+Berlin', (err, data) => {
//     if (err) {
//         console.log('ERROR: ', err);
//     } else {
//         console.log('DATA: ', data);
//     }
// });

// //! done in forecast.js
// const latitude = 52.53041;
// const longitude = 13.38527;

// forecast(latitude, longitude, (err, data) => {
//     if (err) {
//         console.log('ERROR: ', err);
//     } else {
//         console.log('DATA: ', data);
//     }
// });

//! Callback Chaining 
//! coordinates fetched by geocode now are forwarded as 
//! inputs for forecaste and getting output directly using one single input
// geoCode('Invalidenstr+117+Berlin', (err, data) => {
//     if (err) {
//        return console.log('ERROR: ', err);
//     } 
//     forecast(data.latitude, data.longitude, (err, forcasteData) => {
//         if (err) {
//             return console.log('ERROR: ', err);
//         }
//         console.log(data.CityName); 
//         console.log(forcasteData);
//     });
// });


//!
//! Goal : accept a location via command line argument 
//!
//! 1. access command line arguments without yargs 
//! 2. use the string value as input for geocode
//! 3. only geocode if the location was provided 
//! 4. test your work with couple of locations 

//? without destructuring
const location = process.argv[2];

if (!location) {
    console.log('Please provide a location');
} else {
    geoCode(location, (err, data) => {
        if (err) {
            return console.log('ERROR: ', err);
        } 
        forecast(data.latitude, data.longitude, (err, forecastData) => {
            if (err) {
                return console.log('ERROR: ', err);
            }
            console.log(data.CityName); 
            console.log(forecastData);
        });
    });
}

//? with destructuring // not working properly dont use this 
// import forecast from './utils/forecast.js';
// import geoCode from './utils/geocode.js';

// const location = process.argv[2];

// if (!location) {
//     console.log('Please provide a location');
// } else {
//     geoCode(location, (err, { CityName, latitude, longitude } = {}) => {
//         if (err) {
//             return console.log('ERROR: ', err);
//         } 
//         forecast(latitude, longitude, (err, forecastData) => {
//             if (err) {
//                 return console.log('ERROR: ', err);
//             }
//             console.log(CityName); 
//             console.log(forecastData);
//         });
//     });
// }
