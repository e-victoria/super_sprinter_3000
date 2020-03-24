import firebase from './firebase.js';

export default function getDataFromDb() {
    const database = firebase.database();
    const table = database.ref('user_stories');
    let data;
    table.on("value", function (snapshot) {
        data = snapshot.val();
        createUserStory(data);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function createUserStory(data) {
    console.log(data[0]["title"]);
    const userStory = document.querySelector('.user_stories__item');
    console.log(userStory);
}