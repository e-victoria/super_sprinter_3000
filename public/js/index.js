import FormValidator from './FormValidator.js';

const addStoryBtn = document.getElementById('add-story-btn');
const addStoryPopup = document.querySelector('.add-story-popup');
const userStories = document.querySelectorAll('.user_stories__title--content');
const editStoryPopup = document.querySelector('.edit-story-popup');

const xmlHttpRequest = new XMLHttpRequest();

for (let i = 0; i < userStories.length; i++) {
    userStories[i].onclick = () => {
        const closePopupBtn = document.querySelector('.edit-popup__btn--cancel');
        const submitBtn = document.querySelector('.edit-popup__btn--submit');
        editStoryPopup.classList.add('add-story-popup--opened');

        const inputs = collectFormData(editStoryPopup);
        const tableRow = document.querySelectorAll('.user_stories__item')[i];
        const oldValues = [...tableRow.getElementsByTagName('td')];

        for (let j = 0; j < inputs.length; j++) {
            if (inputs[j].tagName === 'INPUT') {
                inputs[j].value = oldValues[j + 1].textContent;
            } else if (inputs[j].tagName === 'SELECT') {
                const options = inputs[j].querySelectorAll('option');
                for (let option of options) {
                    if (option.textContent === oldValues[j + 1].textContent) {
                        option.selected = true;
                    }
                }
            } else {
                inputs[j].textContent = oldValues[j + 1].textContent;
            }
        }

        closePopupBtn.onclick = (e) => {
            e.preventDefault();
            editStoryPopup.classList.remove('add-story-popup--opened');
        }

        submitBtn.onclick = (e) => {
            e.preventDefault();
            const formValidator = new FormValidator(editStoryPopup);
            const editedData = {};
            const dataToSend = {};
            dataToSend["id"] = i;

            for (let input of inputs) {
                editedData[input['name']] = input.value;
            }

            dataToSend["story"] = editedData;

            if (formValidator.getIsValid()) {
                postToServer('/edit_story', dataToSend);
                getResponseFromServer();
                editStoryPopup.classList.remove('add-story-popup--opened');
            } else {
                alert('not valid');
            }
        }
    }
}

addStoryBtn.onclick = (e) => {
    const closePopupBtn = document.querySelector('.add-popup__btn--cancel');
    const submitBtn = document.querySelector('.add-popup__btn--submit');
    const inputs = collectFormData(addStoryPopup);

    e.preventDefault();
    addStoryPopup.classList.add('add-story-popup--opened');

    closePopupBtn.onclick = (e) => {
        e.preventDefault();
        addStoryPopup.classList.remove('add-story-popup--opened');
    }

    submitBtn.onclick = (e) => {
        e.preventDefault();

        const formValidator = new FormValidator(addStoryPopup);
        const idsColumnds = document.querySelectorAll('.user_stories__id--content');
        const ids = [];
        for (let id of idsColumnds) {
            ids.push(parseInt(id.innerHTML));
        }
        let newStoryId = Math.max(...ids) + 1;
        const dataToSend = {};
        dataToSend["id"] = newStoryId;
        const newStoryJson = {};

        for (let input of inputs) {
            newStoryJson[input['name']] = input.value;
        }

        dataToSend["story"] = newStoryJson;

        if (formValidator.getIsValid()) {
            postToServer('/add_new_story', dataToSend);
            getResponseFromServer();
            addStoryPopup.classList.remove('add-story-popup--opened');
        } else {
            alert('not valid');
        }
    }
};

function getResponseFromServer() {
    xmlHttpRequest.onload = () => {
        if (xmlHttpRequest.status == '200') {
            console.log('successful');
        } else {
            console.log('Some error: ' + xmlHttpRequest.status)
        }
    }
}

function postToServer (uri, dataToSend) {
    xmlHttpRequest.open('POST', uri);
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
    xmlHttpRequest.send(JSON.stringify(dataToSend));
}

function collectFormData (popup) {
    const inputs = popup.querySelectorAll('input, textarea, select');
    return inputs;
};