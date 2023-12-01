const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint untuk mendapatkan semua data dari tabel
app.get("/api/data", (req, res) => {
  db.query("SELECT * FROM booking", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
