const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
const mystery = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

/////////// STAN
app.get('/mysteries/state', (req, res) => {
    mystery.query('SELECT * FROM mysteriesState', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

/////////// RADOSNE
app.get('/mysteries/radosne', (req, res) => {
    mystery.query('SELECT * FROM mysteries WHERE part="radosne"', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

/////////// CHWALEBNE
app.get('/mysteries/chwalebne', (req, res) => {
    mystery.query('SELECT * FROM mysteries WHERE part="chwalebne"', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

/////////// ŚWIATŁA
app.get('/mysteries/swiatla', (req, res) => {
    mystery.query('SELECT * FROM mysteries WHERE part="swiatla"', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

/////////// BOLESNE
app.get('/mysteries/bolesne', (req, res) => {
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