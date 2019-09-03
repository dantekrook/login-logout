var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "databas.db";

let db = new sqlite3.Database(DBSOURCE, err => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log("Connected to the SQlite database.");
    }
});

module.exports = db;

var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000;

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.use(express.static("public"));

app.get("/logout/id", (req, res, next) => {
    console.log("Called");
});

app.post("/login", function(req, res) {
    console.log("Called");
    var user = req.body.username;
    var pass = req.body.password;
    var sql = `SELECT id, COUNT(*) AS logged FROM users WHERE password="${pass}" AND username="${user}"`;
    db.get(sql, function(err, row) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        var userid = 0;
        if (row.logged) {
            userid = row.id;
        }
        res.json({ id: userid });
    });
});

// Root path
app.get("/", (req, res, next) => {
    res.json({ message: "Okay" });
});
