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
// var db = require("./database.js");
var md5 = require("md5");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000;

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.use(express.static("public"));

app.get("/login/id", (req, res, next) => {
    console.log("Called");
});

app.post("/login/:username/:pass", function(req, res) {
    console.log("Called");
    var user = req.body.UserName;
    var word = req.body.CarName;

    res.send("Data added successfully!");
});

// Root path
app.get("/", (req, res, next) => {
    res.json({ message: "Ok" });
});
