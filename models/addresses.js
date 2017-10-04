var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');
var modelContacts = require('../models/contact.js')

class Address {
    constructor(data) {
        this.id = data.id
        this.street = data.street
        this.city = data.city
        this.zipcode = data.zipcode
        this.idContacts = data.idContacts
        this.name = this.getContactName()
    }

    static getAll(callback) {
        let query = `SELECT * FROM addresses`
        return new Promise((resolve,reject) => {
            db.all(query, (err,rows) => {
                if(!err){
                    resolve(rows)
                } else {
                    reject(err)
                }
            })
        })
        // db.all(query, (err, rows) => {
        //     let address = rows.map(d => new Address(d))
        //     callback(address)
        // })
    }

    // static createAddress(params) {
    //     let query = `INSERT INTO addresses (street,city,zipcode,idContacts) VALUES
    //     ('${params.street}', '${params.city}', '${params.zipcode}', '${params.idContacts}')`
    //     return new Promise((resolve,reject) => {
    //         db.run(query, (err,params) => {
    //             if(!err) {
    //                 resolve(params)
    //             } else {
    //                 reject(err)
    //             }
    //         })
    //     })
    // }
    static createAddress(params, callback) {
        let query = `INSERT INTO addresses (street,city,zipcode,idContacts) VALUES
        ('${params.street}', '${params.city}', '${params.zipcode}', '${params.idContacts}')`
        db.run(query, () => {
            callback()
        })
    }

    // static deleteAddress(params) {
    //     let query = `DELETE FROM addresses WHERE id = ${params}`
    //     return new Promise((resolve,reject) => {
    //         db.run(query, (err,params) => {
    //             if(!err) {
    //                 resolve(params)
    //             } else {
    //                 reject(err)
    //             }
    //         })
    //     })
   
    // }

    static deleteAddress(params, callback) {
        let query = `DELETE FROM addresses WHERE id = ${params}`
        db.run(query, () => {
            callback()
        })
    }

    // static deleteAddress(params) {
    //     let query = `DELETE FROM addresses WHERE id = ${params}`
    //     return new Promise((resolve,reject) => {
    //         db.run(query, (err,rows) => {
    //             if(!err) {
    //                 resolve(params)
    //             } else {
    //                 reject(err)
    //             }
    //         })
    //     })
  
    // }

    static selectByAddressId(params, callback) {
        let query = `SELECT * FROM addresses WHERE id = ${params}`
        db.all(query, (err,rows) => {
            callback(rows)
        })
    }

    static updateAddress(params, id, callback) {
        let query = `UPDATE addresses SET street='${params.street}',city='${params.city}',zipcode='${params.zipcode}' WHERE
        id=${id}`
        db.run(query, () => {
            callback()
        })
    }

    static selectBycontact(params, callback) {
        let query = `SELECT * FROM addresses WHERE idContacts = ${params}`
        db.all(query, (err,rows) => {
            callback(rows)
        })
    }

    getContactName() {
        modelContacts.selectById(this.idContacts,(datas) => {
            console.log(datas)
            return this.name = datas[0].name
            // return this.name = 'Halo'
        })
    }

    // static getContactName(id) {
    //     modelContacts.selectById(id,(datas) => {
    //         this.name = datas.name
    //         // callback()
    //     })
    // }

    // static getContactName(params, callback) {
    //     modelContacts.selectById(params.id,(datas) => {
    //         this.name = datas[0].name
    //     })
    // }
    
}

module.exports = Address
