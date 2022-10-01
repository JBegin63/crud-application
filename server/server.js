const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require("body-parser");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "crud_db",
});

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get", (req, res) => {
    const sqlSelect = 
        "SELECT * FROM movie_reviews";

    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
        console.log(result);
    });
});

app.post("/api/insert", (req,res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = 
        "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";

    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    });
});

app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName
    const sqlDelete = 
        "DELETE FROM movie_reviews WHERE movieName = ?";

    db.query(sqlDelete, name, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    })
});

app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = 
        "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    })
});

app.listen(3001, () => {
    console.log("Running on port 3001");
})