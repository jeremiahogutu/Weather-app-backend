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
const geocodeUrl = `https://geocoder.api.here.com/6.2/geocode.json?searchtext=${encodedAddress}&app_id=gsYbZt1D0vdlrOheGMhh&app_code=-XfaXYriTAhKLHyxaU8_gg&gen=8`;

axios.get(geocodeUrl).then((body) => {
    if (body.data.Response === undefined) {
        throw new Error('Unable to find that address.')
    }
    const longitude = body.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
    const latitude = body.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
    const weatherUrl = `https://api.darksky.net/forecast/ddec24402bd1b9e72a119ae60c3cbd29/${latitude},${longitude}`;
    console.log(body.data.Response.View[0].Result[0].Location.Address.Label);
    return axios.get(weatherUrl)
}).then((response) => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`Its currently ${Math.round((temperature-32*(5/9))*10)/10}. It feels like ${Math.round((apparentTemperature-32*(5/9))*10)/10}.`)
}).catch((e) => {
    console.log(e.message)
});