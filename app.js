const request = require('request');
const yargs = require('yargs');

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

request({
    url: `https://geocoder.api.here.com/6.2/geocode.json?searchtext=${encodedAddress}&app_id=gsYbZt1D0vdlrOheGMhh&app_code=-XfaXYriTAhKLHyxaU8_gg&gen=8`,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log('unable to connect to sever')
    } else if (body.Response === undefined) {
        console.log('Unable to find address.')
    } else  {
        console.log(`Address: ${body.Response.View[0].Result[0].Location.Address.Label}`);
        console.log(`Latitude: ${body.Response.View[0].Result[0].Location.DisplayPosition.Latitude}`);
        console.log(`Longitude: ${body.Response.View[0].Result[0].Location.DisplayPosition.Longitude}`);
    }
});