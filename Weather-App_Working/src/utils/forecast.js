//! url parsing and giving the required loaction in url
//! (52.53041,13.38527) //you can acces only this one because you dont have subcription
import http from 'postman-request'
import dotenv from 'dotenv';
const result = dotenv.config();

if (result.error) {
    console.error('Error loading .env file:', result.error);
}

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

//? without destructuring 
const forecast = (latitude, longitude, callback) => {
    const url_1 = `http://api.weatherstack.com/current?access_key=${process.env.FORECAST}db7&query=${latitude},${longitude}`;
    http({ url: url_1, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to location services!', undefined);
        } else if (res.statusCode !== 200 || !res.body.current) {
            callback('Unable to find location. Try another search!', undefined);
        } else {
            const data = res.body.current;
            callback(undefined, `It is currently ${data.temperature} degrees out with a humidity of ${data.humidity}%.`);
        }
    });
};

export default forecast;

//? with destructuring // not working properly dont use this 

// import http from 'postman-request';

// const forecast = (latitude, longitude, callback) => {
//     const url_1 = `http://api.weatherstack.com/current?access_key=APIIIIIIKEYYYY7&query=${latitude},${longitude}`;
//     http({ url: url_1, json: true }, (err, { body } = {}) => {
//         if (err) {
//             callback('Unable to connect to location services!', undefined);
//         } else if (!body.current) {
//             callback('Unable to find location. Try another search!', undefined);
//         } else {
//             const { temperature, humidity } = body.current;
//             callback(undefined, `It is currently ${temperature} degrees out with a humidity of ${humidity}%.`);
//         }
//     });
// };

// export default forecast;
