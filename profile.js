app.post('/profiles', (req, res) => {
    let contactsId = null
    if (req.body.contactsId !== '') {
        contactsId = req.body.contactsId
    }
    let query = `INSERT INTO profiles (username, password, contactsId)
                VALUES
                    ('${req.body.username}','${req.body.password}','${contactsId}'`
    
    db.run(query, function(err) {
        if (err) {
            res.send('Contact Id udah di pakai')
        } else {
            res.redirect('/profiles')
        }
    }) 
})

SELECT 
FROM contacts
LEFT JOIN contacts_groups
ON contacts.id = contacts_groups.contactsId
LEFT JOIN groups 
ON contacts_groups.groupsId = groups.id

alter table profiles2 add column idContacts INTEGER CONSTRAINT fk_contact REFERENCES contacts2(id)