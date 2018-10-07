const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://geocoder.api.here.com/6.2/geocode.json?searchtext=${encodedAddress}&app_id=YOUR-APP-IDapp_code=YOUR-APP-CODE`;

axios.get(geocodeUrl).then((body) => {
    if (body.data.Response === undefined) {
        throw new Error('Unable to find that address.')
    }
    const longitude = body.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
    const latitude = body.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
    const weatherUrl = `https://api.darksky.net/forecast/YOUR-API-KEY/${latitude},${longitude}`;
    console.log(body.data.Response.View[0].Result[0].Location.Address.Label);
    return axios.get(weatherUrl)
}).then((response) => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`Its currently ${Math.round((temperature-32*(5/9))*10)/10}. It feels like ${Math.round((apparentTemperature-32*(5/9))*10)/10}.`)
}).catch((e) => {
    console.log(e.message)
});