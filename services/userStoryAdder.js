const databaseInit = require('./databaseConnection');
var express = require('express');
var bodyParser = require("body-parser");

var firebase = require("firebase/app");
require('firebase/auth');
require('firebase/database');

function addUserStoryToDb(app) {
    //databaseInit();
    const userStoryDatabase = firebase.database();
    const userStoryTable = userStoryDatabase.ref('user_stories');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.post('/add_new_story', function (req, res) {
        var estimatesRef = userStoryDatabase.ref().child('user_stories');
        estimatesRef.once('value', function (estimatesSnapshot) {
            var updates = {};
            estimatesSnapshot.forEach(function (estimateSnapshot) {
                updates[estimateSnapshot.key + '/priority'] = estimateSnapshot.val().priority + 1;
            });
            estimatesRef.push(req.body);
        });
        console.log(req.body);
        res.sendStatus(200);
    });
}

module.exports = addUserStoryToDb;