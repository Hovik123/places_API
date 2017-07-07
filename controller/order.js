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
getPlacesByParams(params)
        .then(data => {
            let { item, place } = data,
                { lat, lng } = place.geometry.location
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
        }).catch((err) => res.send(err));
}

function getOrderViaDestination(req, res) {
    const params = {
        location: `${req.param('lat')},${req.param('lng')}`,
        radius: 5000
    };
    getPlacesByParams(params)
        .then(data => {
            let { item, place } = data,
                { lat, lng } = place.geometry.location,
                params = {
                    location: `${lat},${lng}`,
                    radius: 5000
                },
               isOddNumber = isOdd();
            getPlacesByParams(params)
                .then(result => {
                    let destinationItem = result.item,
                        destinationPlace = result.place,
                        destination = {
                            lat: destinationPlace.geometry.location.lat,
                            lng: destinationPlace.geometry.location.lng,
                            duration: destinationItem.durationValue,
                            distance: destinationItem.distanceValue
                        }
                    const order = {
                        order: {
                            id: getRandomNumber(1000),
                            taxiType: `${getRandomNumber(4)}`,
                            pickUpAddress: {
                                address: place.vicinity,
                                lat: lat,
                                lng: lng
                            },
                            duration: isOddNumber ? (destination.duration / 60).toFixed(2) : (item.durationValue / 60).toFixed(2),
                            destination: isOddNumber ? destination.distance : item.distanceValue
                        }
                    };
                    if (isOddNumber) {
                        order.order.destinationAddress = {
                            address: destinationItem.destination,
                            lat: destination.lat,
                            lng: destination.lng
                        }
                    }
                    res.send(order);
                })
        })
        .catch((err) => res.send(err));
}~

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

function getPlacesByParams(params = {}) {
    return new Promise((resolve, reject) => {
        places.nearbySearch(params)
            .then(data => {
                const places = JSON.parse(data.text).results,
                    place = places[getRandomNumber(places.length - 1)];
                let { lat, lng } = place.geometry.location;
                return getDistance({
                    origin: params.location,
                    destination: `${lat},${lng}`,
                })
                    .then((item) => {
                        resolve({ item, place });
                    });
            })
            .catch(err => reject(err));
    });
};
function isOdd(){
    return getRandomNumber(4) % 2 !== 0; 
}

module.exports = {
    order: getOrder,
    getOrderViaDestination
};