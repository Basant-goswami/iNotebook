const connectToMongo = require ('./db');
const express = require('express');
var cors = require('cors')
const { Router } = require('express');

// const BASE_URL = process.env.BASE_URL
// const hostname = `${BASE_URL}`

connectToMongo();
const app = express()
const port = 10000

// const port = process.env.PORT || 5000
// const hostname = '127.0.0.1'

app.use(cors())
app.use(express.json());          // important 

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => { 
  console.log(`this web app listening on port ${port}`)
})

// app.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}`);
// });
