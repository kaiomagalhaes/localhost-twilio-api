const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.get('/events', (req, res) => {
  console.log(req.query)

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(req.query));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
