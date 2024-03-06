import express from "express";
import fs from "node:fs/promises";
const app = express();

app.get("/contacts", async (req, res) => {
  const contacts = await fs.readFile("./contacts.json", "utf-8");
  console.log(contacts);
  res.json({ message: JSON.parse(contacts) });
});

app.get("/contacts/query", async (req, res) => {
  const contacts = JSON.parse(await fs.readFile("./contacts.json", "utf-8"));
  const email = req.query.email;
  const telefono = req.query.telefono;
  const contactsRequired = [];
  if (email && telefono) {
    contacts.contacts.forEach((contact) => {
      if (contact.email == email && contact.phone == telefono) {
        contactsRequired.push(contact);
      }
    });
  } else if (email) {
    contacts.contacts.forEach((contact) => {
      if (contact.email == email) {
        contactsRequired.push(contact);
      }
    });
  } else if (telefono) {
    contacts.contacts.forEach((contact) => {
      if (contact.phone == telefono) {
        contactsRequired.push(contact);
      }
    });
  }

  if (contactsRequired.length == 0) return res.json({ message: "Not contacts founds" });

  res.json({ message: contactsRequired });
});

const PORT = process.env.PORT || 1111;

app.listen(PORT, () => {
  console.log("server runing");
});
