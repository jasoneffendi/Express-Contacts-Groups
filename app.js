const express = require('express')
const app = express()

const sqlite3 = require('sqlite3').verbose(); //verbose untuk memunculkan error boleh dipakai atau gak
const db = new sqlite3.Database('db/database.db');

app.set('view engine', 'ejs')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

let index = require('./routes/index')
let contact = require('./routes/contacts')
let group = require('./routes/groups')
let profiles = require('./routes/profile')
let address = require('./routes/addresses')
app.use('/',index)
app.use('/contacts',contact)
app.use('/groups',group)
app.use('/profile',profiles)
app.use('/addresses',address)



app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})