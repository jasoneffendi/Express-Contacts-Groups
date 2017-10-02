var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('db/database.db')
var modelProfile = require('../models/profile.js')

class Contact {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.company = data.company
        this.telp = data.telp
        this.email = data.email
    }

    static getAll(callback) {
        let query = `SELECT * FROM contacts`
        db.all(query, (err,rows) => {
            let contacts = rows.map(d => new Contact(d))
           callback(contacts)
        })
    }

    static createPost(params, callback) {
        let query = `INSERT INTO contacts (name,company,telp,email) VALUES
        ('${params.name}', '${params.company}', '${params.telp}', '${params.email}')`
        db.run(query, () => {
            callback()
        })
    }

    static deleteContact(params, callback) {
        let query = `DELETE FROM contacts WHERE id = ${params}`
        db.run(query, () => {
            callback()
        })
    }

    static selectById(params, callback) {
        let query = `SELECT * FROM contacts WHERE id = ${params}`
        db.all(query, (err,rows) => {
            callback(rows)
        })
    }

    static updateContact(params, id, callback) {
        let query = `UPDATE contacts SET name = '${params.name}', company = '${params.company}',
        telp = '${params.telp}', email = '${params.email}' WHERE id = ${id}`
        db.run(query, () => {
            callback()
        })
    }

    static findById(id, callback) {
        let query = `SELECT * FROM contacts WHERE contacts.id = ${id}`
        db.all(query, (err,rows) => {
            if (err) return
            let posts = rows.map(r => new Contact(r))
            callback(posts[0])
        })
    }

    static findWhere(attr, key, callback) {
        let query = `SELECT * FROM contacts WHERE ${attr} = ${key}`
        db.all(query, (err,rows) => {
            if (err) return
            let contact = rows.map(r => new Contact(r))
            callback(contact)
        })
    }

    getProfileName(callback) { 
        modelProfile.selectByContactId(this.id,(datas) => {
            callback(datas)
        })
    }

}


module.exports = Contact
