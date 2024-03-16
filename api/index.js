import express from "express";
const app = express();
// import cors from "cors";

// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Puedes ajustar '*' según tus necesidades
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());

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

const compararName = (firtsName, lastName, str3) => firtsName.toLocaleLowerCase().includes(str3.toLocaleLowerCase()) || lastName.toLocaleLowerCase().includes(str3.toLocaleLowerCase());

app.get("/contacts", async (req, res) => {
  const email = req.query.email;
  const phone = req.query.phone;
  const name = req.query.name;

  const contactsRequired = [...contacts].filter((contact) => {
    if ((name && !compararName(contact.firstName, contact.lastName, name)) || (email && !contact.email.includes(email)) || (phone && !contact.phone.includes(phone))) return false;
    return true;
  });

  if (contactsRequired.length > 0) return res.json(contactsRequired);
  if ((email || phone || name) && contactsRequired.length == 0) return res.status(404).json({ message: "Not contacts founds" });
  res.json(contacts);
});

app.post("/contact", (req, res) => {
  const body = req.body;
  console.log(req.body);
  contacts.push(body);
  res.json(body);
});

const PORT = process.env.PORT || 1111;

app.listen(PORT, () => {
  console.log("server runing");
});
