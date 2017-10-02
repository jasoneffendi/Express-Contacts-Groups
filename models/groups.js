var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('db/database.db')

class Group {
    constructor(data) {
        this.id = data.id
        this.name_of_group = data.name_of_group
    }

    static getAllGroup(callback) {
        let query = `SELECT * FROM groups`
        db.all(query, (err,rows) => {
            let groups = rows.map(d => new Group(d))
           callback(groups)
        
        })
    }

    static createGroup(params, callback) {
        let query = `INSERT INTO groups (name_of_group) VALUES
        ('${params.name_of_group}')`
        db.run(query, () => {
            callback()
        })
    }

    static deleteGroup(params, callback) {
        let query = `DELETE FROM groups WHERE id = ${params}`
        db.run(query, () => {
            callback()
        })
    }

    static selectByGroupId(params, callback) {
        let query = `SELECT * FROM groups WHERE id = ${params}`
        db.all(query, (err,rows) => {
            callback(rows)
        })
    }

    static updateGroup(params, id, callback) {
        let query = `UPDATE groups SET name_of_group = '${params.name_of_group}' WHERE id = ${id}`
        db.run(query, () => {
            callback()
        })
    }

}


module.exports = Group
