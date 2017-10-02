let express = require('express')
let router = express.Router()
let modelGroups = require('../models/groups.js')

router.get('/', (req,res) => {
    modelGroups.getAllGroup((rows) => {
        res.render('groups',{data: rows, title: 'Halaman Groups'})
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

module.exports = router