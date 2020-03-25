import firebase from './firebase.js';

export default function getuserStoryDataFromDb() {
    const userStoryDatabase = firebase.database();
    const userStoryTable = userStoryDatabase.ref('user_stories');
    let userStoryData;

    userStoryTable.on("value", function (snapshot) {
        userStoryData = snapshot.val();
        createUserStory(userStoryData);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function createNewRows (rowsAmount) {
    const table = document.querySelector('.user_stories__table');
    const userStoryItem = document.querySelector('.user_stories__item');
    for (let i = 0; i < rowsAmount; i++) {
        const newRow = userStoryItem.cloneNode(true);
        table.appendChild(newRow);
    }
}

function getTaskStatus(userStoryData, userStoryItems) {
    const userStoryDatabase = firebase.database();
    const taskStatusTable = userStoryDatabase.ref('task_status');
    let statusData;

    taskStatusTable.on("value", function (snapshot) {
        statusData = snapshot.val();
        addTaskStatus(statusData);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    function addTaskStatus(statusData) {
        for (let i = 0; i < userStoryData.length; i++) {
            const status = userStoryItems[i].querySelector('.user_stories__status--content');
            const statusId = userStoryData[i]["status"];
            status.textContent = statusData[statusId]['status'];
        }
    }
}


function createUserStory(userStoryData) {
    createNewRows(userStoryData.length - 1);

    const userStoryItems = document.querySelectorAll('.user_stories__item');

    for (let i = 0; i < userStoryData.length; i++) {
        const id = userStoryItems[i].querySelector('.user_stories__id--content');
        const title = userStoryItems[i].querySelector('.user_stories__title--content');
        const userStory = userStoryItems[i].querySelector('.user_stories__story--content');
        const acceptance = userStoryItems[i].querySelector('.user_stories__acceptance--content');
        const businessValue = userStoryItems[i].querySelector('.user_stories__business-value--content');
        const estimation = userStoryItems[i].querySelector('.user_stories__estimation--content');

        id.textContent = Object.keys(userStoryData)[i];
        title.textContent = userStoryData[i]['title'];
        userStory.textContent = userStoryData[i]['user_story'];
        acceptance.textContent = userStoryData[i]['acceptance_criteria'];
        businessValue.textContent = userStoryData[i]['business_value'];
        estimation.textContent = userStoryData[i]['estimation'];

        getTaskStatus(userStoryData, userStoryItems);
    }
}