const mysql = require("mysql");
const express = require("")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dribbble",
});

// Membuka koneksi
connection.connect((err) => {
  if (err) {
    console.error("Koneksi ke database gagal: ", err);
  } else {
    console.log("Koneksi ke database berhasil");
  }
});

module.exports = connection;
