let express = require('express')
let router = express.Router()
let modelContacts = require('../models/contact.js')
let modelAddress = require('../models/addresses.js')

// router.get('/', (req,res) => {
//     modelContacts.getAll((rows) => {
//         let limit = rows.length
//         let counter = 0
//         rows.forEach(function(contact) {
//             if (counter < limit) {
//                 contact.getProfileName(datas => {    
//                     contact.profile = datas
//                     counter++
//                     if (counter === limit) return res.render('contacts',{data: rows, title: 'Halaman Contact'})             
//                 })
//             } 
//         })
//     })
// })

router.get('/', (req,res) => {
    modelContacts.getAll((rows) => {
        let limit = rows.length
        let counter = 0
        rows.forEach(function(contact) {
            if (counter < limit) {
                contact.getProfileName(datas => {    
                    contact.profile = datas
                    counter++
                    if (counter === limit) {
                        // return res.send(rows)
                        return res.render('contacts',{data: rows, title: 'Halaman Contact'})
                    }             
                })
            } 
        })
        // res.render('contacts',{data: rows, title: 'Halaman Contacts'})
    })
})

router.post('/', (req, res) => {
    if (req.body.name !== '' && req.body.company !== '' && req.body.telp !== '' && req.body.email !== '') {
        modelContacts.createPost(req.body, () => {
                res.redirect('/contacts')
        })
    }
})

router.get('/delete/:id', (req,res) => {
    modelContacts.deleteContact(req.params.id, () => {
        res.redirect('/contacts')
    })
})

router.get('/edit/:id', (req,res) => {
    modelContacts.selectById(req.params.id, (rows) => {
        res.render('contactsedit',{data: rows})
    })
})

router.post('/edit/:id', (req, res) => {
    modelContacts.updateContact(req.body, req.params.id, () => {
        res.redirect('/contacts')
    })
})

router.get('/show/:id', (req,res) => {
    modelAddress.selectBycontact(req.params.id ,(rows) => {
        modelContacts.getAll((dataContact) => {
            console.log(dataContact)
            res.render('showAddress',{data: rows,dataContact: dataContact, title: 'Halaman Addresses'})            
        })
    })
})
module.exports = router