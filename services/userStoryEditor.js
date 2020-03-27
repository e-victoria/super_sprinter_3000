var bodyParser = require("body-parser");

var firebase = require("firebase/app");
require('firebase/auth');
require('firebase/database');

function editUserStoryToDb(app) {
    const userStoryDatabase = firebase.database();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.post('/edit_story', function (req, res) {
        const id = req.body["id"];
        const newStory = req.body["editedStory"];
        var estimatesRef = userStoryDatabase.ref().child('user_stories').child(id);
        estimatesRef.once('value', function (estimatesSnapshot) {
            var updates = {};
            estimatesSnapshot.forEach(function (estimateSnapshot) {
                updates[estimateSnapshot.key + '/priority'] = estimateSnapshot.val().priority + 1;
            });
            estimatesRef.set(newStory);
        });
        res.sendStatus(200);
    });
}

module.exports = editUserStoryToDb;