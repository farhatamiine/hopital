var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var moment = require("moment");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const { v4: uuidv4 } = require("uuid");

//console.log(uuidv4());

var mysql = require("mysql");
const dbConfig = require("../db.config");
var resultat;
var con = mysql.createConnection(dbConfig.db);

con.connect(function (err) {
  if (err) throw err;
  console.log("Database is Connected!");
});

router.get("/RendezVous", (req, res) => {
  var sql = "select * from rendezVous";
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.get("/rendezVous/patient/:idPatient", (req, res) => {
  var sql = `select * from rendezVous where idPatient = ${req.params.idPatient}
  order by date
  ;`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.get("/rendezVous/medecin/:idMedecin", (req, res) => {
  var sql = `select id, service title, date startDate from rendezvous where idMedecin = ${req.params.idMedecin}`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.post("/RendezVous", (req, res) => {
  //  {
  //     dateR: '2020-05-25 12:45:55',
  //     service: 'consultation',
  //     presence: false,
  //     prix: 255.0
  //     date: '2020-05-25 12:45:55',
  //     cheminDeBilan: 'fill it later',
  //     idPatient: '1401',
  //     idMedecin: '1102'
  // }
  var data = req.body;
  data.id = uuidv4();
  console.log(data);
  var sql = `INSERT INTO rendezVous 
    (id, dateR, service, presence, prix, date, cheminDeBilan, idMedecin, idPatient) VALUES 
    ('${data.id}', '${data.dateR}', '${data.service}', ${data.presence}, ${data.prix}, '${data.date}' , '${data.cheminDeBilan}', '${data.idMedecin}', '${data.idPatient}');`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.put("/rendezVous", (req, res) => {
  let data = req.body;
  let sql = "";
  console.log(data);
  if (data.title || data.startDate) {
    if (data.title && data.startDate) {
      data.startDate = moment(data.startDate).format("YYYY-MM-DD hh:mm:ss");
      sql = `update rendezVous set service = '${data.title}' , date = '${data.startDate}' where id = '${data.id[0]}';`;
    } else if (data.startDate) {
      data.startDate = moment(data.startDate).format("YYYY-MM-DD hh:mm:ss");
      sql = `update rendezVous set date = '${data.startDate}' where id = '${data.id[0]}';`;
    } else if (data.title)
      sql = `update rendezVous set service = '${data.title}'  where id = '${data.id[0]}';`;
    con.query(sql, (err, result) => {
      console.log(sql);
      if (err) throw err;
      else {
        res.send(result);
      }
    });
  }
});

router.delete("/rendezVous/:id", (req, res) => {
  var sql = `delete from rendezVous where id = '${req.params.id}';`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.get("/dataRdv/:idRdv", (req, res) => {
  var sql = `select * from rendezVous where id= '${req.params.idRdv}';`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

module.exports = router;
