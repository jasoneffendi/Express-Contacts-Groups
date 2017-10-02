var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('db/database.db')
let modelAddress = require('../models/addresses.js')
let modelContacts = require('../models/contact.js')