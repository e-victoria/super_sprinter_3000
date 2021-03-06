const databaseInit = require('./databaseConnection');
var express = require('express');

var firebase = require("firebase/app");
require('firebase/auth');
require('firebase/database');

function getUserStoryDataFromDb(app) {
    databaseInit();
    const userStoryDatabase = firebase.database();
    const userStoryTable = userStoryDatabase.ref('user_stories');
    let userStoryData;

    userStoryTable.on("value", function (snapshot) {
        userStoryData = snapshot.val();
        createUserStory(userStoryData, app);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}


function createUserStory(userStoryData, app, statusData) {
    const ids = Object.keys(userStoryData);
    for (let i = 0; i < ids.length; i++) {
        userStoryData[ids[i]]["id"] = ids[i];
    }

    app.set('view engine', 'pug');
    app.get('/', function (req, res) {
        app.use(express.static(__dirname + '/../public/'));
            res.render('index', {
                rows: userStoryData
            });
    })
}

module.exports = getUserStoryDataFromDb;