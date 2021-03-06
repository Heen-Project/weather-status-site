const request = require('postman-request');

//// https://www.mapbox.com/
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoibm9lbDIzIiwiYSI6ImNrYXZ6cjU4eDFsNWMyeXAzOWhraGtieXAifQ.ZgNJR4zn7wIh4I0me4OZWA&limit=1';
    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to location service!', undefined);
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined);
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode
