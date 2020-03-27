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

        const inputs = this.collectFormData(editStoryPopup);
        const tableRow = document.querySelectorAll('.user_stories__item')[i];
        const oldValues = [...tableRow.getElementsByTagName('td')];
        
        for (let j = 0; j < inputs.length; j++) {
            if (inputs[j].tagName === 'INPUT') {
                inputs[j].value = oldValues[j+1].textContent;
            } else if (inputs[j].tagName === 'SELECT') {
                const options = inputs[j].querySelectorAll('option');
                for (let option of options) {
                    if (option.textContent === oldValues[j+1].textContent) {
                        option.selected = true;
                    }
                }
            } else {
                inputs[j].textContent = oldValues[j+1].textContent;
            }   
        }

        closePopupBtn.onclick = (e) => {
            e.preventDefault();
            editStoryPopup.classList.remove('add-story-popup--opened');
        }

        submitBtn.onclick = (e) => {
            e.preventDefault();
            const editedData = {};
            const dataToSend = {};
            dataToSend["id"] = i;

            for (let input of inputs) {
                editedData[input['name']] = input.value;
            }
            
            dataToSend["story"] = editedData;
            this.postToServer('/edit_story', dataToSend);
            this.getResponseFromServer();
            editStoryPopup.classList.remove('add-story-popup--opened');
        }
    }
}

addStoryBtn.onclick = (e) => {
    const closePopupBtn = document.querySelector('.add-popup__btn--cancel');
    const submitBtn = document.querySelector('.add-popup__btn--submit');
    const inputs = this.collectFormData(addStoryPopup);

    e.preventDefault();
    addStoryPopup.classList.add('add-story-popup--opened');

    closePopupBtn.onclick = (e) => {
        e.preventDefault();
        addStoryPopup.classList.remove('add-story-popup--opened');
    }

    submitBtn.onclick = (e) => {
        e.preventDefault();

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
        this.postToServer('/add_new_story', dataToSend);
        this.getResponseFromServer();
        addStoryPopup.classList.remove('add-story-popup--opened');
    }
};

getResponseFromServer = () => {
    xmlHttpRequest.onload = () => {
        if (xmlHttpRequest.status == '200') {
            console.log('successful');
        } else {
            console.log('Some error: ' + xmlHttpRequest.status)
        }
    }
}

postToServer = (uri, dataToSend) => {
    xmlHttpRequest.open('POST', uri);
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
    xmlHttpRequest.send(JSON.stringify(dataToSend));
}

collectFormData = (popup) => {
    const inputs = popup.querySelectorAll('input, textarea, select');
    return inputs;
};