const getUserStoryDataFromDb = require('./services/userStoryGetter.js');
const addUserStoryToDb = require('./services/userStoryAdder.js');

var express = require('express');
var app = express();

getUserStoryDataFromDb(app);
addUserStoryToDb(app);
