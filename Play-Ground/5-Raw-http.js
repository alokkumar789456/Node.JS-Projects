import http from 'http';

const url = `http://api.weatherstack.com/current?access_key=be96af46d93f1da96570cb84de137db7&query=berlin`;

const request = http.request(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk.toString();
    });

    res.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.on('error', (err) => {
    console.error('ERROR: ', err);
});

request.end();
