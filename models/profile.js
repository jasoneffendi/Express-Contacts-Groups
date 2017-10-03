var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('db/database.db')
var modelContacts = require('../models/contact.js')

class Profile {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.password = data.password;
        this.idContacts = data.idContacts;
        this.name = data.name;
    }

    static getAll(callback) {
        // let query = `SELECT profile.id,profile.username,profile.password,
        //             profile.idContacts,contacts.name 
        //             FROM profile LEFT JOIN contacts ON profile.idContacts = contacts.id`
        let query = `SELECT * FROM profile`
        db.all(query, (err,rows) => {
            let profile = rows.map(d => new Profile(d))
           callback(profile)
        
        })
    }

    static createProfile(params, callback) {
        var value = params.idContacts;
        var split = value.split(",");
        var v1 = split[0];
        var v2 = split[1];
        console.log(split[0])
        let query = `INSERT INTO profile (username,password,idContacts,name) VALUES
        ('${params.username}', '${params.password}', '${v1}', '${v2}')`
        db.run(query, (err) => {
            callback(err)
        })
    }

    static deleteProfile(params, callback) {
        let query = `DELETE FROM profile WHERE id = ${params}`
        db.run(query, () => {
            callback()
        })
    }

    static selectByContactId(params, callback) {
        let query = `SELECT * FROM profile WHERE idContacts = ${params}`
        db.all(query, (err,rows) => {
                callback(rows)
        })
    }

    static updateProfile(params, id, callback) {
        let query = `UPDATE profile SET username = '${params.username}', password = '${params.password}'
        WHERE id = ${id}`
        db.run(query, () => {
            callback()
        })
    }

}


module.exports = Profile
