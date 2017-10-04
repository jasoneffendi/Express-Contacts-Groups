let express = require('express')
let router = express.Router()
let modelGroups = require('../models/groups.js')
let modelContacts = require('../models/contact.js')
var modelgroupContacts = require('../models/contactGroup.js')

router.get('/', (req,res) => {
    // modelGroups.getAllGroup((rows) => {
    //     modelContacts.getAll((contacts) => {
    //         modelgroupContacts.getAll((data) => {
    //             res.render('groups',{data: rows, title: 'Halaman Groups'})
    //         })
    //     })
    // })

    modelGroups.getAllGroup()
    .then(rows => {
        modelContacts.getAll()
        .then(contacts => {
            res.render('groups',{data: rows, title: 'Halaman Groups'})
        })
    })
})

router.post('/', (req, res) => {
    if (req.body.name_of_group !== '') {
        // modelGroups.createGroup(req.body, () => {
        //         res.redirect('/groups')
        // })
        modelGroups.createGroup(req.body)
        .then(()=> {
            res.redirect('/groups')
        })
    }
})

router.get('/delete/:id', (req,res) => {
    // modelGroups.deleteGroup(req.params.id, () => {
    //     res.redirect('/groups')
    // })
    modelGroups.deleteGroup(req.params.id)
    .then(() => {
        res.redirect('/groups')       
    })
})

router.get('/edit/:id', (req,res) => {
    // modelGroups.selectByGroupId(req.params.id, (rows) => {
    //     res.render('groupsedit',{data: rows})
    // })

    modelGroups.selectByGroupId(req.params.id)
    .then(rows => {
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