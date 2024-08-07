const fs = require('fs').promises;
const path = require('path');
const {nanoid} = require('nanoid');
const pathObject = {
  root: "./",
  dir: "./db",
  base: "contacts.json",
};
const contactsPath = path.format(pathObject);

// TODO: udokumentuj każdą funkcję
function listContacts() {
  fs.readFile(contactsPath).then(data => {
    const res = JSON.parse(data);
    const contList = res.map((obj) => { return { id: obj.id, name: obj.name, email: obj.email, phone: obj.phone, } });
    console.table(contList);
  })
}

function getContactById(contactId) {
  fs.readFile(contactsPath).then(data => {
    const res = JSON.parse(data);
    const contact = res.find(obj => obj.id === contactId);
    console.log(contact);
  })
}

function removeContact(contactId) {
  fs.readFile(contactsPath).then(data => {
    const res = JSON.parse(data);
    const contactIndex = res.findIndex(obj => obj.id === contactId);
    if (contactIndex === -1) {
      return console.log("nie znaleziono kontatku!")
    };
    res.splice(contactIndex, 1);
    fs.writeFile(contactsPath, JSON.stringify(res, null, 2));
    console.table(res);
    console.log("Pomyślnie usunięto użytkownika!");
  })
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath).then(data => {
    const res = JSON.parse(data);
    res.push({ id: nanoid(), name, email, phone });
    fs.writeFile(contactsPath, JSON.stringify(res, null, 2));
    console.table(res);
    console.log('Użytkownik dodany pomyślnie!')
  });
}

module.exports={
  listContacts,
  getContactById,
  removeContact,
  addContact,
}