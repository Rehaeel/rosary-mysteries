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

/////////// USER

app.post('/user', (req, res) => {
	const { email, password } = req.headers;

	new Promise((resolve, reject) => {
		mystery.query(
			`SELECT email FROM user WHERE email='${email}'`,
			(err, response) => {
				if (err) {
					reject(err.message);
				} else {
					if (response.length > 0) {
						reject('użytkownik jest już zajęty');
					} else resolve();
				}
			}
		);
	})
		.then(() => {
			mystery.query(
				`INSERT INTO user (email, password) VALUES ('${email}', '${password}')`,
				(err, result) => {
					if (err) {
						res.status(400).json(err.message);
					} else {
						if (result['affectedRows'] > 0) res.send('success!');
                        else res.send(result)
					}
				}
			);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
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
