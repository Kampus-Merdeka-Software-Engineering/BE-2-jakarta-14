const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

// const CyclicDb = require("@cyclic.sh/dynamodb");
// const db = CyclicDb("tender-ant-jeansCyclicDB");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_SQL_HOST || "hydroflow.id",
  user: process.env.DB_SQL_USER || "vpuijmph_revou",
  password: process.env.DB_SQL_PASS || ",IaU]lJC%5e.",
  database: process.env.DB_SQL_NAME || "vpuijmph_revou",
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

// const booking = db.collection("booking")

// untuk get data
app.get("/get", (req, res) => {
  const sql = "SELECT * FROM booking";
  db.query(sql, (err, result) => {
    if (err) throw err;
    const users = JSON.parse(JSON.stringify(result));
    res.send(users);
  });
});

// unutuk insert data
app.post("/post", (req, res) => {
  const insertSql = `INSERT INTO booking (full_name, phone, check_in, check_out) VALUES ('${req.body.full_name}', 
      '${req.body.phone}', 
      '${req.body.check_in}', 
      '${req.body.check_out}')`;

  db.query(insertSql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Data berhasil ditambahkan" });
    }
  });
});

app.listen(process.env.PORT || 9900, () => {
  console.log("server ready....");
});
