import express, { json } from "express";
import fs from "node:fs/promises";
const app = express();

app.get("/", (req, res) => {
  res.send("hola");
});

app.get("/contacts", async (req, res) => {
  // const contacts = await fs.readFile("./contacts.json", "utf-8");
  // console.log(contacts);
  // res.send(JSON.stringify(contacts));
  const contacts = [
    {
      firstName: "Jessica",
      lastName: "Chapman",
      email: "nealandrew@johnson-henson.com",
      phone: "(613)187-9227",
    },
    {
      firstName: "Shawn",
      lastName: "Jefferson",
      email: "cardenasdaniel@burnett.biz",
      phone: "001-634-104-9518x9011",
    },
    {
      firstName: "Adam",
      lastName: "Evans",
      email: "butlerjimmy@kane-jones.com",
      phone: "(637)086-1351",
    },
    {
      firstName: "Stephanie",
      lastName: "Hill",
      email: "qhill@marsh-miller.com",
      phone: "+1-127-424-4264x422",
    },
    {
      firstName: "Donald",
      lastName: "Johnson",
      email: "zeverett@yahoo.com",
      phone: "+1-815-818-6249x794",
    },
    {
      firstName: "Regina",
      lastName: "Mcdaniel",
      email: "jjohnson@gmail.com",
      phone: "1556362963",
    },
    {
      firstName: "Adam",
      lastName: "Thompson",
      email: "mlane@gmail.com",
      phone: "001-800-300-5470x801",
    },
    {
      firstName: "Gene",
      lastName: "Wright",
      email: "christinacrawford@gmail.com",
      phone: "3637948998",
    },
    {
      firstName: "Laura",
      lastName: "Mcclure",
      email: "taylor24@cantrell.com",
      phone: "001-521-898-5776x953",
    },
    {
      firstName: "Dylan",
      lastName: "Cook",
      email: "shannonblack@gmail.com",
      phone: "690-961-1456",
    },
  ];
  const email = req.query.email;
  const phone = req.query.phone;
  const name = req.query.name;
  console.log(name);

  const contactsRequired = [];

  if (email && phone && name) {
    contacts.forEach((contact) => {
      if (
        contact.email.includes(email) &&
        contact.phone.includes(phone) &&
        (contact.firstName.toLocaleLowerCase().includes(name.toLocaleLowerCase()) || contact.lastName.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
      )
        contactsRequired.push(contact);
    });
  } else if (phone && name) {
    contacts.forEach((contact) => {
      if (contact.phone.includes(phone) && (contact.firstName.toLocaleLowerCase().includes(name.toLocaleLowerCase()) || contact.lastName.toLocaleLowerCase().includes(name.toLocaleLowerCase())))
        contactsRequired.push(contact);
    });
  } else if (email && name) {
    contacts.forEach((contact) => {
      if (contact.email.includes(email) && (contact.firstName.toLocaleLowerCase().includes(name.toLocaleLowerCase()) || contact.lastName.toLocaleLowerCase().includes(name.toLocaleLowerCase())))
        contactsRequired.push(contact);
    });
  } else if (phone && email) {
    contacts.forEach((contact) => {
      if (contact.phone.includes(phone) && contact.email.includes(email)) contactsRequired.push(contact);
    });
  } else if (email) {
    contacts.forEach((contact) => {
      if (contact.email.includes(email)) contactsRequired.push(contact);
    });
  } else if (phone) {
    contacts.forEach((contact) => {
      if (contact.phone.includes(phone)) contactsRequired.push(contact);
    });
  } else if (name) {
    contacts.forEach((contact) => {
      if (contact.firstName.toLocaleLowerCase().includes(name.toLocaleLowerCase()) || contact.lastName.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
        contactsRequired.push(contact);
      }
    });
  }

  // console.log(name);

  if (contactsRequired.length > 0) return res.json(contactsRequired);
  if ((email || phone || name) && contactsRequired.length == 0) return res.json({ message: "Not contacts founds" });
  console.log(contacts);
  res.json(contacts);
});

app.get("/contacts/query", async (req, res) => {
  console.log("first");
  // const contacts = JSON.parse(await fs.readFile("../contacts.json", "utf-8"));
  const contacts = [
    {
      firstName: "Jessica",
      lastName: "Chapman",
      email: "nealandrew@johnson-henson.com",
      phone: "(613)187-9227",
    },
    {
      firstName: "Shawn",
      lastName: "Jefferson",
      email: "cardenasdaniel@burnett.biz",
      phone: "001-634-104-9518x9011",
    },
    {
      firstName: "Adam",
      lastName: "Evans",
      email: "butlerjimmy@kane-jones.com",
      phone: "(637)086-1351",
    },
    {
      firstName: "Stephanie",
      lastName: "Hill",
      email: "qhill@marsh-miller.com",
      phone: "+1-127-424-4264x422",
    },
    {
      firstName: "Donald",
      lastName: "Johnson",
      email: "zeverett@yahoo.com",
      phone: "+1-815-818-6249x794",
    },
    {
      firstName: "Regina",
      lastName: "Mcdaniel",
      email: "jjohnson@gmail.com",
      phone: "1556362963",
    },
    {
      firstName: "Adam",
      lastName: "Thompson",
      email: "mlane@gmail.com",
      phone: "001-800-300-5470x801",
    },
    {
      firstName: "Gene",
      lastName: "Wright",
      email: "christinacrawford@gmail.com",
      phone: "3637948998",
    },
    {
      firstName: "Laura",
      lastName: "Mcclure",
      email: "taylor24@cantrell.com",
      phone: "001-521-898-5776x953",
    },
    {
      firstName: "Dylan",
      lastName: "Cook",
      email: "shannonblack@gmail.com",
      phone: "690-961-1456",
    },
  ];
  const email = req.query.email;
  const telefono = req.query.telefono;
  const contactsRequired = [];
  // console.log(contacts);
  if (email && telefono) {
    contacts.forEach((contact) => {
      if (contact.email == email && contact.phone == telefono) {
        contactsRequired.push(contact);
      }
    });
  } else if (email) {
    contacts.forEach((contact) => {
      if (contact.email == email) {
        contactsRequired.push(contact);
      }
    });
  } else if (telefono) {
    contacts.forEach((contact) => {
      if (contact.phone == telefono) {
        contactsRequired.push(contact);
      }
    });
  }

  // console.log(contactsRequired);

  if (contactsRequired.length == 0) return res.json({ message: "Not contacts founds" });

  res.json(contactsRequired);
});

const PORT = process.env.PORT || 1111;

app.listen(PORT, () => {
  console.log("server runing");
});