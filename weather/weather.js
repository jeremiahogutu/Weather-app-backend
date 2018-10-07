const  request = require('request');

const getWeather = (longitude, latitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/ddec24402bd1b9e72a119ae60c3cbd29/${longitude},${latitude}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature:  body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        } else {
            callback('Unable to fetch weather.');
        }
    });
};

module.exports.getWeather = getWeather;

