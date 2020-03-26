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
        getTaskStatus(userStoryData, app);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function getTaskStatus(userStoryData, app) {
    const userStoryDatabase = firebase.database();
    const taskStatusTable = userStoryDatabase.ref('task_status');
    var statusData;
    taskStatusTable.on("value", function (snapshot) {
        statusData = snapshot.val();
        createUserStory(userStoryData, app, statusData);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}


function createUserStory(userStoryData, app, statusData) {
    let rowsAmount = '';
    for (let i = 0; i < userStoryData.length; i++) {
        rowsAmount += '1';
        userStoryData[i]["id"] = Object.keys(userStoryData)[i];
        const statusId = userStoryData[i]["status"];
        userStoryData[i]["status"] = statusData[statusId]['status'];
    }
    app.set('view engine', 'pug');
    app.get('/', function (req, res) {
        app.use(express.static(__dirname + '/../public/'));
            res.render('index', {
                rows: userStoryData
            });
    })
    app.listen(3000);
}

module.exports = getUserStoryDataFromDb;