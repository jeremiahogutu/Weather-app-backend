const request = require('request');

request({
    url: 'https://www.metaweather.com/api/location/2471217/',
    json: true
}, (error, response, body) => {
    const latitude = body.parent.latt_long.toString().split(',')[0];
    const longitude = body.parent.latt_long.toString().split(',')[1];
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`)
});