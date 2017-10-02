const express = require('express')
const app = express()

const sqlite3 = require('sqlite3').verbose(); //verbose untuk memunculkan error boleh dipakai atau gak
const db = new sqlite3.Database('db/database.db');

app.set('view engine', 'ejs')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index')
})

//This is for Contacts Table
app.get('/contacts', (req, res) => {
    db.all(`SELECT * FROM contacts`, (err, rows) => {
        res.render('contacts', {data: rows, title: 'Halaman Contact'})
    })
})

app.post('/contacts', (req, res) => {
    db.run(`INSERT INTO contacts (name,company,telp,email) VALUES
    ('${req.body.name}', '${req.body.company}', '${req.body.telp}', '${req.body.email}')`, () => {
        res.redirect('/contacts')
    })
})

app.get('/contacts/delete/:id/', (req, res) => {
    db.run(`DELETE FROM contacts WHERE id = ${req.params.id}`, () => {
        res.redirect('/contacts')
    })
})

// app.get('/contacts/edit/:id/', (req, res) => {
//     db.all(`SELECT * FROM contacts WHERE id = ${req.params.id}`, (err, rows) => {
//         res.render('contactsedit', {data: rows[0], title: 'Halaman Contact Edit'})
//     })
// })

app.get('/contacts/edit/:id/', (req, res) => {
    db.each(`SELECT * FROM contacts WHERE id = ${req.params.id}`, (err, rows) => {
        res.render('contactsedit', {data: rows, title: 'Halaman Contact Edit'})
    })
})

app.post('/contacts/edit/:id', (req, res) => {
    db.run(`UPDATE contacts SET name='${req.body.name}',company='${req.body.company}',telp='${req.body.telp}',email='${req.body.email}' WHERE
    id=${req.params.id}`, () => {
        res.redirect('/contacts')
    })
})
//This is the end of contacts table settings

//This is the start of groups table settings
app.get('/groups', (req, res) => {
    db.all(`SELECT * FROM groups`, (err, rows) => {
        res.render('groups', {data: rows, title: 'Halaman Group'})
    })
})

app.post('/groups', (req, res) => {
    db.run(`INSERT INTO groups (name_of_group) VALUES
    ('${req.body.name_of_group}')`, () => {
        res.redirect('/groups')
    })
})

app.get('/groups/delete/:id/', (req, res) => {
    db.run(`DELETE FROM groups WHERE id = ${req.params.id}`, () => {
        res.redirect('/groups')
    })
})

// app.get('/groups/edit/:id/', (req, res) => {
//     db.all(`SELECT * FROM groups WHERE id = ${req.params.id}`, (err, rows) => {
//         res.render('groupsedit', {data: rows[0], title: 'Halaman Group Edit'})
//     })
// })

app.get('/groups/edit/:id/', (req, res) => {
    db.each(`SELECT * FROM groups WHERE id = ${req.params.id}`, (err, rows) => {
        res.render('groupsedit', {data: rows, title: 'Halaman Group Edit'})
    })
})

app.post('/groupsedit/:id', (req, res) => {
    db.run(`UPDATE groups SET name_of_group='${req.body.name_of_group}' WHERE
    id=${req.params.id}`, () => {
        res.redirect('/groups')
    })
})
//This is the end of the group program

//This is the beginning of the profile program
app.get('/profile', (req, res) => {
    db.all(`SELECT * FROM profile`, (err, rows) => {
        res.render('profile', {data: rows, title: 'Halaman Profile'})
    })
})

app.post('/profile', (req, res) => {
    db.run(`INSERT INTO profile (username,password) VALUES
    ('${req.body.username}', '${req.body.password}')`, () => {
        res.redirect('/profile')
    })
})

app.get('/profile/delete/:id/', (req, res) => {
    db.run(`DELETE FROM profile WHERE id = ${req.params.id}`, () => {
        res.redirect('/profile')
    })
})

// app.get('/profile/edit/:id/', (req, res) => {
//     db.all(`SELECT * FROM profile WHERE id = ${req.params.id}`, (err, rows) => {
//         res.render('profileedit', {data: rows[0], title: 'Halaman Profile Edit'})
//     })
// })

app.get('/profile/edit/:id/', (req, res) => {
    db.each(`SELECT * FROM profile WHERE id = ${req.params.id}`, (err, rows) => {
        res.render('profileedit', {data: rows, title: 'Halaman Profile Edit'})
    })
})

app.post('/profileedit/:id', (req, res) => {
    db.run(`UPDATE profile SET username='${req.body.username}',password='${req.body.password}' WHERE
    id=${req.params.id}`, () => {
        res.redirect('/profile')
    })
})
//This is the end of the profile program

//This is the beginning of addresses program
app.get('/addresses', (req, res) => {
    db.all(`SELECT * FROM addresses`, (err, rows) => {
        res.render('addresses', {data: rows, title: 'Halaman Address'})
    })
})

app.post('/addresses', (req, res) => {
    db.run(`INSERT INTO addresses (street,city,zipcode) VALUES
    ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}')`, () => {
        res.redirect('/addresses')
    })
})

app.get('/addresses/delete/:id/', (req, res) => {
    db.run(`DELETE FROM addresses WHERE id = ${req.params.id}`, () => {
        res.redirect('/addresses')
    })
})

// app.get('/addresses/edit/:id/', (req, res) => {
//     db.all(`SELECT * FROM addresses WHERE id = ${req.params.id}`, (err, rows) => {
//         res.render('addressedit', {data: rows[0], title: 'Halaman Profile Edit'})
//     })
// })

app.get('/addresses/edit/:id/', (req, res) => {
    db.each(`SELECT * FROM addresses WHERE id = ${req.params.id}`, (err, rows) => {
        res.render('addressedit', {data: rows, title: 'Halaman Profile Edit'})
    })
})

app.post('/addressedit/:id', (req, res) => {
    db.run(`UPDATE addresses SET street='${req.body.street}',city='${req.body.city}',zipcode='${req.body.zipcode}' WHERE
    id=${req.params.id}`, () => {
        res.redirect('/addresses')
    })
})
//This is the end of address program

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})