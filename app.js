const getUserStoryDataFromDb = require('./services/userStoryGetter.js');
const addUserStoryToDb = require('./services/userStoryAdder.js');
const editUserStoryToDb = require('./services/userStoryEditor.js');

var express = require('express');
var app = express();
app.listen(3000);

getUserStoryDataFromDb(app);
addUserStoryToDb(app);
editUserStoryToDb(app);