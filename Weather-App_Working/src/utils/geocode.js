//! url parsing and giving the required location in url
//! q=Invalidenstr+117+Berlin //you can access only this one because you doNot have subscription
import http from 'postman-request'

//? without destructuring
const geoCode = (address, callback) => {
    let url_2 = 'https://geocode.search.hereapi.com/v1/geocode?q=' + encodeURIComponent(address) + '&apiKey=PNTq3X_nNHxvCFaON31PTHFD6FGfFKsmJVWl8mmpngg';
    http({ url: url_2, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to location services!', undefined);
        } else if (res.statusCode !== 200 || res.body.items.length === 0) {
            callback('Unable to find location. Try another search!', undefined);
        } else {
            const items = res.body.items;
            callback(undefined, {
                CityName: items[0].address.city,
                latitude: items[0].position.lat,
                longitude: items[0].position.lng
            });
        }
    });
};

export default geoCode

//? with destructuring // not working properly doNot use this 
// import http from 'postman-request';

// const geoCode = (address, callback) => {
//     const url = 'https://geocode.search.hereapi.com/v1/geocode?q=' + encodeURIComponent(address) + '&apiKey=PNTq3X_nNHxvCFaON31PTHFD6FGfFKsmJVWl8mmpngg';
//     http({ url, json: true }, (err, { body } = {}) => {
//         if (err) {
//             callback('Unable to connect to location services!', undefined);
//         } else if (!body.data || body.data.length === 0) {
//             callback('Unable to find location. Try another search!', undefined);
//         } else {
//             console.log(body); // Log the full response for debugging
//             const { city: CityName, latitude, longitude } = body.data[0];
//             callback(undefined, { CityName, latitude, longitude });
//         }
//     });
// };

// export default geoCode;

