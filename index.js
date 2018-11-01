require('dotenv').config()
const express = require('express')
const app = express()
const fakeApi = require('./fakeApi')

const port = process.env.PORT || 3000

app.get('/events', (req, res) => {
  const { zipcode, quantity, travel_distance } = req.query
  fakeApi.getEvents(zipcode, travel_distance, (events) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(events));
  }, quantity);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
