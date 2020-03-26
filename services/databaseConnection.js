function initFirebase() {
    var firebase = require("firebase/app");
    const config = {
        apiKey: "...",
        authDomain: "....firebaseapp.com",
        databaseURL: "https://super-sprinter-300.firebaseio.com/",
        projectId: "...",
    };
    firebase.initializeApp(config);
}

module.exports = initFirebase;