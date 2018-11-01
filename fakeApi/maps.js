const request = require('request');

const googleMapsKey = process.env.GOOGLE_MAPS_KEY

const getCoordinates = (zipcode, callback) => {
  request(`https://maps.googleapis.com/maps/api/geocode/json?address=${33127}&key=${googleMapsKey}`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }

    const  { results } = body
    const { geometry } = results[0]
    const { location } = geometry
    callback(location)
  });
}

const getLatitudeWithTravelDistance = (latitude, travel_distance) => {
  const earth = 6378.137,  //radius of the earth in kilometer
    pi = Math.PI,
    m = (1 / ((2 * pi / 360) * earth)) / 1000;  //1 meter in degree

  const travelDistanceInMeters = travel_distance / 0.0016

  return latitude + (travelDistanceInMeters * m);
}

const getRandomAddresses = (zipcode, travel_distance, quantity, callback) => {
  getCoordinates(zipcode, (coordinates) => {
    const { lat, lng } = coordinates

    const randomAddressesPromisses = Array.from(Array(quantity)).map(() => (
      new Promise(function(resolve) {
        const randomDistance = Math.floor(Math.random() * travel_distance);
        const latWithDistance = getLatitudeWithTravelDistance(lat, randomDistance)

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latWithDistance},${lng}&key=${googleMapsKey}`
        request(url, { json: true }, (err, res, body) => {
          if (err) { return console.log(err); }
          const  { results } = body

          const { formatted_address } = results[0]
          resolve(formatted_address)
        });
      })
    ));
    Promise.all(randomAddressesPromisses).then(function(values) {
      callback(values)
    });
  })
}

const addRandomAddresses = (zipcode, travel_distance, events, callback) => {
  getRandomAddresses(zipcode, travel_distance, events.length, (addresses) => {
    const eventsWithAddresses = events.map((event, i) => {
      event.address = addresses[i]
      return event
    })
    callback(eventsWithAddresses)
  })
};

module.exports = {
  addRandomAddresses,
}
