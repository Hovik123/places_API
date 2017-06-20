const API_KEY = 'AIzaSyCezVZ_cJO0huqcwqjj-LqKqCAyTjKxs10';
const GooglePlaces = require('node-googleplaces');
const distanceAPI = require('google-distance');
const places = new GooglePlaces(API_KEY);
distanceAPI.apiKey = API_KEY;
/**
 * return current order
 * @param req
 * @param res
 */
function getOrder(req, res) {
    const params = {
        location: `${req.param('lat')},${req.param('long')}`,
        radius: 5000
    };
    places.nearbySearch(params)
        .then((data) => {
            const places = JSON.parse(data.text).results,
                place = places[getRandomNumber(places.length - 1)],
            {lat, lng} = place.geometry.location;
            return getDistance({
                origin: params.location,
                destination: `${lat},${lng}`,
            }).then(item => {
                const order = {
                    order: {
                        id: getRandomNumber(10000),
                        location: {
                            address: place.vicinity,
                            lat: lat,
                            long: lng
                        },
                        duration: (item.durationValue / 60).toFixed(2),
                        destination: item.distanceValue
                    }
                };
                res.send(order);
            });
        }).catch((err) => res.send(err));
}

function getRandomNumber(range) {
    return Math.floor((Math.random() * range) + 1);
}
function getDistance(params = {}) {
    return new Promise((resolve, reject) => {
        distanceAPI.get(params, function (err, data) {
            if (err) reject(err);
            resolve(data);
        })
    })
}

module.exports = {
    order: getOrder
};