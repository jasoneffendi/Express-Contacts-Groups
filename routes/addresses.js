let express = require('express')
let router = express.Router()
let modelAddress = require('../models/addresses.js')
let modelContacts = require('../models/contact.js')

router.get('/', (req,res) => {
    modelAddress.getAll((rows) => {
        modelContacts.getAll((dataContact) => {
            res.render('addresses',{data: rows,dataContact: dataContact, title: 'Halaman Addresses'})
            // res.send(rows)
        })
    })
})

router.post('/', (req, res) => {
    if (req.body.username !== '' && req.body.password !== '' && req.body.idContacts !== '') {
        modelAddress.createAddress(req.body, (err) => {
                res.redirect('/addresses')
        })
    }
})

router.get('/delete/:id', (req,res) => {
    modelAddress.deleteAddress(req.params.id, () => {
        res.redirect('/addresses')
    })
})

router.get('/edit/:id', (req,res) => {
    modelAddress.selectByAddressId(req.params.id, (rows,rowsContacts) => {
        res.render('addressedit',{data: rows, title: 'Halaman Address Edit', dataContact: rowsContacts})
    })
})

router.post('/edit/:id', (req, res) => {
    modelAddress.updateAddress(req.body, req.params.id, () => {
        res.redirect('/addresses')
    })
})


module.exports = router