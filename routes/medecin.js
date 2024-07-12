var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const { v4: uuidv4 } = require("uuid");

console.log(uuidv4());

var mysql = require("mysql");
const dbConfig = require("../db.config");
var resultat;
var con = mysql.createConnection(dbConfig.db);
con.connect(function (err) {
  if (err) throw err;
  console.log("Database is Connected!");
});

router.get("/allMedecin", (req, res) => {
  var sql = "select * from user where role='medecin'";
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.get("/allMedecins", (req, res) => {
  var sql = "select * from user ";
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

module.exports = router;
