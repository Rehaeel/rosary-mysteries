const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.DB_PORT;

app.use(cors());
app.use(express.json());
const mystery = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

/////////// STAN
app.get('/state', (req, res) => {
    mystery.query('SELECT * FROM mysteriesState', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

/////////// STARTING DAY
app.get('/startingday', (req, res) => {
    mystery.query('SELECT * FROM startingDay', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/startingday', (req, res) => {
    mystery.query(`UPDATE startingDay SET startingDay = ? WHERE id = 1`);
})


/////////// RADOSNE
app.get('/radosne', (req, res) => {
    mystery.query('SELECT * FROM mysteries WHERE part="radosne"', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

/////////// CHWALEBNE
app.get('/chwalebne', (req, res) => {
    mystery.query('SELECT * FROM mysteries WHERE part="chwalebne"', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

/////////// ŚWIATŁA
app.get('/swiatla', (req, res) => {
    mystery.query('SELECT * FROM mysteries WHERE part="swiatla"', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

/////////// BOLESNE
app.get('/bolesne', (req, res) => {
    mystery.query('SELECT * FROM mysteries WHERE part="bolesne"', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`My DB run on ${PORT} port`);
});