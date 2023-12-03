const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dribbble",
});

db.connect((err) => {
  if (err) throw err;

  console.log("database connected....");

  const sql = "SELECT * FROM booking";
  db.query(sql, (err, result) => {
    const users = JSON.parse(JSON.stringify(result));
    console.log("hasil database -> ", users);
  });
});

// untuk get data
app.get("/", (req, res) => {
  res.send(users);
});

// unutuk insert data
app.post("/", (req, res) => {
  const insertSql = `INSERT INTO booking (full_name, phone, check_in, check_out) VALUES ('${req.body.full_name}', 
      '${req.body.phone}', 
      '${req.body.check_in}', 
      '${req.body.check_out}')`;

  db.query(insertSql, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(9900, () => {
  console.log("server ready....");
});
