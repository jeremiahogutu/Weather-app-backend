const request = require('request');

request({
    url: 'https://www.metaweather.com/api/location/4118/',
    json: true
}, (error, response, body) => {
    console.log(body, undefined, 2);
});