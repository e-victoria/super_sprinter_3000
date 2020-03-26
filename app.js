const getUserStoryDataFromDb = require('./services/userStoryDao.js');

var express = require('express');
var app = express();

//app.use(require('./routes/static'));

getUserStoryDataFromDb(app);
