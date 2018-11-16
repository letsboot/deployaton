const express = require('express')
const cors = require('cors')
const app = express()
const db = require('simple-postgres');

app.use(cors())

app.get('/', (req, res) => res.send('hello'))
app.get('/name', (req, res) => res.send('express'))
app.get('/users', async (req, res) => {
    let users = await db.rows('SELECT * FROM SOME_TABLE')
    res.send(users);
})

app.listen(3000, () => console.log('Express server started and listening.'))
