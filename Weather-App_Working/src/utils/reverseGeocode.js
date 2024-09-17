import http from 'postman-request';

const reverseGeocode = (lat, lon, callback) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=f93334b25e8744fe899d797bf2865a4f`;

    http({ url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to location services!', undefined);
        } else {
            console.log('Response:', res.body); // Log the API response

            if (res.statusCode !== 200 || !res.body.results || res.body.results.length === 0) {
                callback('Unable to find location. Try another search!', undefined);
            } else {
                const item = res.body.results[0];
                const city = item.formatted
                callback(undefined, {
                    CityName: city,
                    latitude: item.geometry.lat,
                    longitude: item.geometry.lng
                });
            }
        }
    });
};

export default reverseGeocode;
