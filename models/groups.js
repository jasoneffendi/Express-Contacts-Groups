var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('db/database.db')
var modelgroupContacts = require('../models/contactGroup.js')
var modelContacts = require('../models/contact.js')

class Group {
    constructor(data) {
        this.id = data.id
        this.name_of_group = data.name_of_group
        // this.members = this.groupMembers();
    }

    static getAllGroup(callback) {
        let query = `SELECT * FROM groups`
        // db.all(query, (err,rows) => {
        //     let groups = rows.map(d => new Group(d))
        //    callback(groups)
        // })
        return new Promise((resolve,reject) => {
            db.all(query, (err,rows) => {
                let result = rows.map(d => new Group(d))
               if(!err) {
                   resolve(result)
               } else {
                   reject(err)
               }
            })
        })
    }

    static createGroup(params, callback) {
        let query = `INSERT INTO groups (name_of_group) VALUES
        ('${params.name_of_group}')`
        // db.run(query, () => {
        //     callback()
        // })
        return new Promise((resolve,reject) => {
            db.all(query, (err) => {
               if(!err) {
                   resolve()
               } else {
                   reject(err)
               }
            })
        })
    }

    static deleteGroup(params, callback) {
        let query = `DELETE FROM groups WHERE id = ${params}`
        // db.run(query, () => {
        //     callback()
        // })
        return new Promise((resolve,reject) => {
            db.all(query, (err) => {
               if(!err) {
                   resolve()
               } else {
                   reject(err)
               }
            })
        })
    }

    static selectByGroupId(params, callback) {
        let query = `SELECT * FROM groups WHERE id = ${params}`
        // db.all(query, (err,rows) => {
        //     callback(rows)
        // })

        return new Promise((resolve,reject) => {
            db.all(query, (err,rows) => {
               if(!err) {
                   resolve(rows)
               } else {
                   reject(err)
               }
            })
        })
    }

    static updateGroup(params, id, callback) {
        let query = `UPDATE groups SET name_of_group = '${params.name_of_group}' WHERE id = ${id}`
        db.run(query, () => {
            callback()
        })
    }

    static assignGroup(params, id, callback) {
        console.log(params)
        let query = `INSERT INTO contactGroup (contactId, groupId) VALUES ('${params.contactId}', '${id}')`
        db.run(query, () => {
            callback()
        })
    }

    groupMembers() {
        var temp = [];
        modelgroupContacts.getContactName(this.id, (data) => {
           data.forEach((d, idx) => {
                modelContacts.selectById(d.contactId,(datas) => {  
                    temp.push(datas[0].name)
                    if(idx >= data.length - 1) {
                        this.members = temp;                   
                    }
                })
           })
        })
    }
    
    

}


module.exports = Group
