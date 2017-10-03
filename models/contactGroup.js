var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('db/database.db')
let modelGroup = require('../models/groups.js')
let modelContacts = require('../models/contact.js')

class contactGroup {
    static getAll(callback) {
        let query = `SELECT * FROM contactGroup`
        db.all(query, (err,rows) => {
            console.log(rows)
            callback(rows)
        })
    }

    static getContactName(params, callback) {
        console.log(params)
        let query = `SELECT * FROM contactGroup WHERE groupId = ${params}`
        db.all(query, (err,rows) => {
            console.log('---')
            console.log(rows)
            console.log('=--')
            callback(rows)
        })
    }
}

module.exports = contactGroup