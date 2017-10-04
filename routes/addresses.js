let express = require('express')
let router = express.Router()
let modelAddress = require('../models/addresses.js')
let modelContacts = require('../models/contact.js')

router.get('/', (req,res) => {
    // modelAddress.getAll((rows) => {
    //     modelContacts.getAll((dataContact) => {
    //         res.render('addresses',{data: rows,dataContact: dataContact, title: 'Halaman Addresses'})
    //         // res.send(rows)
    //     })
    // })

    modelAddress.getAll()
    .then(rows => {
        modelContacts.getAll()
        .then(dataContact => {
            res.render('addresses',{data: rows,dataContact: dataContact, title: 'Halaman Addresses'})            
        })
    })
})

router.post('/', (req, res) => {
    if (req.body.username !== '' && req.body.password !== '' && req.body.idContacts !== '') {
        // modelAddress.createAddress(req.body, (err) => {
        //         res.redirect('/addresses')
        // })
        modelAddress.createAddress(req.body)
        .then(() => {
            res.redirect('/addresses')            
        })
    }
})

router.get('/delete/:id', (req,res) => {
    // modelAddress.deleteAddress(req.params.id, () => {
    //     res.redirect('/addresses')
    // })
    modelAddress.deleteAddress(req.params.id)
    .then(() => {
        res.redirect('/addresses')
    })
})

router.get('/edit/:id', (req,res) => {
    modelAddress.getAll()
    .then(data => {
        var hasil = []
        data.forEach(rows => {
            if(req.params.id == rows.id) {
                hasil.push(rows)
            }
        })
        res.render('addressedit',{data: hasil, title: 'Halaman Address Edit'})        
    })
})

router.post('/edit/:id', (req, res) => {
    // modelAddress.updateAddress(req.body, req.params.id, () => {
    //     res.redirect('/addresses')
    // })

    modelAddress.updateAddress(req.body, req.params.id)
    .then(() => {
        res.redirect('/addresses')
    })
})


module.exports = router