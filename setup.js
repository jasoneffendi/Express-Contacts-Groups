const sqlite3 = require('sqlite3').verbose(); //verbose untuk memunculkan error boleh dipakai atau gak
const db = new sqlite3.Database('db/database.db');

db.serialize(() => {

  db.run(`CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100), company VARCHAR(100), telp VARCHAR(15), email VARCHAR(100))`,() => {
    console.log('Create Table User Contacts Berhasil');
  })

  db.run(`CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_of_group VARCHAR(200))`,() => {
    console.log('Create Table User Groups Berhasil');
  })

  db.run(`CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(100), password VARCHAR(255), name VARCHAR(255), idContacts INTEGER UNIQUE, FOREIGN KEY (idContacts) REFERENCES
    contacts(id))`,() => {
    console.log('Create Table User Profile Berhasil');
  })

  db.run(`CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT,
    street VARCHAR(100), city VARCHAR(50), zipcode INTEGER, idContacts INTEGER, name VARCHAR(250), FOREIGN KEY (idContacts) REFERENCES
    contacts(id))`,() => {
    console.log('Create Table User Address Berhasil');
  })

  db.run(`CREATE TABLE IF NOT EXISTS contactAddress
  (
      contactAddress INTEGER PRIMARY KEY NOT NULL,
      contactId INTEGER REFERENCES contacts(id),
      addressId INTEGER REFERENCES addresses(id)
  )`, () => {
    console.log('CREATE TABLE contactsAddress Berhasil')
  })
})
