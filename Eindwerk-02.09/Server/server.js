'use strict'

var express = require("express");
var app = express();
var path = require("path");
var url = require("url");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get("/spelers", function (request, response) {
    var mongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/Minesweeper';
    console.log(request.query.name)
    mongoClient.connect(url, function (err, db) {
        console.log("Connected successfully to server");
        var collection = db.collection('spelers');
        collection.find({}, { name: 1, rows: 1, cols: 1 , time: 1, mines: 1}).limit(50).toArray(function (err, docs) {
            console.log("Speler document(s) found:");
            response.end(JSON.stringify(docs));
            db.close();
        });
    })
})

app.post("/spelers", function (request, response) {
    console.log(request.body)
    var event = {
        name: request.body.name,
        rows: +request.body.rows,
        cols: +request.body.cols,
        mines:+request.body.mines,
        time: +request.body.time
    }
    var mongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/Minesweeper';
    mongoClient.connect(url, function (err, db) {
        var collection = db.collection('spelers');
        collection.insertOne(event, function (err, r) {
            if (!err) {
                console.log("Gelukt")
            }
            else { console.log(err)
                response.end(JSON.stringify({ message: "gefaald", status: "400" }))
            }
            db.close();
 
        })
    })
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
});