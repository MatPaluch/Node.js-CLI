const fs = require("fs").promises;
const path = require("path");
const contactsPath = "./db/contacts.json";

fs.readFile("./db/contacts.json").then((data) => {
  const res = JSON.parse(data);
  res.map((obj) => console.log(obj.name));
});
