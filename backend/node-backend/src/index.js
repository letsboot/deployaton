const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/name', (req, res) => res.send('express'))

app.listen(3000, () => console.log('Express server started and listening.'))
