var express = require('express');
var app = express();
const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use('/', express.static('public'));
app.use('/', express.static('./'));

module.exports = app;