const request = require('request');

// const yargs = require('yargs');
// const geocode = require('./geocode/geocode');
//
// const argv = yargs
//     .options({
//         a: {
//             demand: true,
//             alias: 'address',
//             describe: 'Address to fetch weather for',
//             string: true
//         }
// })
//     .help()
//     .alias('help', 'h')
//     .argv;
//
// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage)
//     } else {
//         console.log(JSON.stringify(results, undefined, 2));
//     }
// });

// ddec24402bd1b9e72a119ae60c3cbd29

request({
    url: `https://api.darksky.net/forecast/ddec24402bd1b9e72a119ae60c3cbd29/43.47189,-80.51233`,
    json: true
}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        console.log(body.currently.temperature)
    } else {
        console.log('Unable to fetch weather.');
    }
});