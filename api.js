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
	database: process.env.DB_DATABASE,
});

/////////// STARTING DAY
app.get('/startingday', (req, res) => {
	const { email } = req.headers;

	mystery.query(
		`SELECT startingDay FROM startingDay WHERE user='${email}'`,
		(err, result) => {
			if (err) {
				res.status(404).json(err);
			} else {
				res.send(result[0].startingDay);
			}
		}
	);
});

app.put('/startingday/:day', (req, res) => {
	const { day } = req.params;
	const { email } = req.headers;

	mystery.query(
		`UPDATE startingDay SET startingDay='${day}' WHERE user='${email}'`,
		(err, result) => {
			if (err) {
				res.status(404).json(err);
			} else {
				if (result['changedRows'] === 1) res.send('success!');
				else res.send(result);
			}
		}
	);
});

app.listen(process.env.PORT, () => {
	console.log(`My DB run on ${process.env.PORT} port`);
});
