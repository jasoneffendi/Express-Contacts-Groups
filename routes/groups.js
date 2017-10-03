let express = require('express')
let router = express.Router()
let modelGroups = require('../models/groups.js')
let modelContacts = require('../models/contact.js')

router.get('/', (req,res) => {
    modelGroups.getAllGroup((rows) => {
        // res.render('groups',{data: rows, title: 'Halaman Groups'})
        res.send(rows)
    })
})

router.post('/', (req, res) => {
    if (req.body.name_of_group !== '') {
        modelGroups.createGroup(req.body, () => {
                res.redirect('/groups')
        })
    }
})

router.get('/delete/:id', (req,res) => {
    modelGroups.deleteGroup(req.params.id, () => {
        res.redirect('/groups')
    })
})

router.get('/edit/:id', (req,res) => {
    modelGroups.selectByGroupId(req.params.id, (rows) => {
        res.render('groupsedit',{data: rows})
    })
})

router.post('/edit/:id', (req, res) => {
    modelGroups.updateGroup(req.body, req.params.id, () => {
        res.redirect('/groups')
    })
})

router.get('/assign/:id', (req,res) => {
    modelGroups.selectByGroupId(req.params.id, (rows) => {
        modelContacts.getAll((rowsContact) => {
            res.render('assignGroup', {dataGroup: rows, dataContact: rowsContact})            
        })
    })
})

router.post('/assign/:id', (req,res) => {
    modelGroups.assignGroup(req.body, req.params.id, () => {
        console.log(req.body.contactId)
        res.redirect('/groups')
    })
})



module.exports = router