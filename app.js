const getUserStoryDataFromDb = require('./services/userStoryGetter.js');
const updateDatabase = require('./services/databaseService.js');

var express = require('express');
var app = express();
app.listen(3000);

getUserStoryDataFromDb(app);
updateDatabase(app);