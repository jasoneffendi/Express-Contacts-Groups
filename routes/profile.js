let express = require('express')
let router = express.Router()
let modelProfile = require('../models/profile.js')
let modelContacts = require('../models/contact.js')

// router.get('/', (req,res) => {
//     modelProfile.getAll((rows) => {
//         modelContacts.getAll((dataContact) => {
//             res.render('profile',{data: rows, dataContact : dataContact, title: 'Halaman Profile'})
//             // res.send(rows)
//         })
//     })
// })

router.get('/', (req,res) => {
    // modelProfile.getAll((rows) => {
    //     modelContacts.getAll((dataContact) => {
    //         res.render('profile',{data: rows, dataContact : dataContact, title: 'Halaman Profile'})
    //         // res.send(rows)
    //     })
    // })

    modelProfile.getAll()
    .then(rows => {
        modelContacts.getAll()
        .then(dataContact => {
            res.render('profile',{data: rows, dataContact : dataContact, title: 'Halaman Profile'})            
        })
        .catch(err2 => {
            console.log(err2)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

// router.post('/', (req, res) => {
//     if (req.body.username !== '' && req.body.password !== '' && req.body.idContacts !== '') {
//         modelProfile.createProfile(req.body, (err) => {
//             if(!err) {
//                 res.redirect('/profile')
//             }
//             else {
//                 // res.send(err)
//                 res.send('ID Terpakai')
//             }
//         })
//     }
// })

router.post('/', (req, res) => {
        modelProfile.createProfile(req.body)
        .then(data => {
            res.redirect('/profile')
        })
        .catch(err => {
            res.send(err)
        }) 
})

// router.get('/delete/:id', (req,res) => {
//     modelProfile.deleteProfile(req.params.id, () => {
//         res.redirect('/profile')
//     })
// })

router.get('/delete/:id', (req,res) => {
    modelProfile.deleteProfile(req.params.id)
    .then(data => {
        res.redirect('/profile')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/edit/:id', (req,res) => {
    // modelProfile.selectByProfileId(req.params.id, (rows) => {
    //     modelContacts.getAll((rowsContacts) => {
    //         res.render('profileedit',{data: rows, title: 'Halaman Profile Edit', dataContact: rowsContacts})
    //         // res.send(rowsContact)
    //     })
    // })
    modelProfile.selectByProfileId(req.params.id)
    .then(rows => {
        modelContacts.getAll()
        .then(rowsContacts => {
            res.render('profileedit',{data: rows, title: 'Halaman Profile Edit', dataContact: rowsContacts})               
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/edit/:id', (req, res) => {
    modelProfile.updateProfile(req.body, req.params.id, () => {
        res.redirect('/profile')
    })
})

module.exports = router