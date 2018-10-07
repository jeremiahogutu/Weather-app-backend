const request = require('request');

const geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);

    request({
        url: `https://geocoder.api.here.com/6.2/geocode.json?searchtext=${encodedAddress}&app_id=gsYbZt1D0vdlrOheGMhh&app_code=-XfaXYriTAhKLHyxaU8_gg&gen=8`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('unable to connect to sever')
        } else if (body.Response === undefined) {
            callback('Unable to find address.')
        } else  {
            callback(undefined, {
                address: body.Response.View[0].Result[0].Location.Address.Label,
                latitude: body.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
                longitude: body.Response.View[0].Result[0].Location.DisplayPosition.Longitude
            });
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;