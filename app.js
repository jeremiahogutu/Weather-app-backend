const request = require('request');

request({
    url: 'https://geocoder.api.here.com/6.2/geocode.json?searchtext=1301%20Lombard%20St,%20Philadelphia,%20PA%2019147,%20USA&app_id=gsYbZt1D0vdlrOheGMhh&app_code=-XfaXYriTAhKLHyxaU8_gg&gen=8',
    json: true
}, (error, response, body) => {
    console.log(`Address: ${body.Response.View[0].Result[0].Location.Address.Label}`);
    console.log(`Latitude: ${body.Response.View[0].Result[0].Location.DisplayPosition.Latitude}`);
    console.log(`Longitude: ${body.Response.View[0].Result[0].Location.DisplayPosition.Longitude}`);
});