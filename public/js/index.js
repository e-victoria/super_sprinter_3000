const addStoryBtn = document.getElementById('add-story-btn');
const addStoryPopup = document.querySelector('.add-story-popup');

const xmlHttpRequest = new XMLHttpRequest();

addStoryBtn.onclick = (e) => {
    const closePopupBtn = document.querySelector('.add-popup__btn--cancel');
    const submitBtn = document.querySelector('.add-popup__btn--submit');
    const inputs = this.collectFormData();

    e.preventDefault();
    addStoryPopup.classList.add('add-story-popup--opened');

    closePopupBtn.onclick = (e) => {
        e.preventDefault();
        addStoryPopup.classList.remove('add-story-popup--opened');
    }

    submitBtn.onclick = (e) => {
        e.preventDefault();

        const newStoryJson = {};

        for (let input of inputs) {
            newStoryJson[input['name']] = input.value;
        }

        xmlHttpRequest.open('POST', '/add_new_story');
        console.log(JSON.stringify(newStoryJson));
        xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
        xmlHttpRequest.send(JSON.stringify(newStoryJson));
        xmlHttpRequest.onload = () => {
            console.log('successful');
        }
    }
};

collectFormData = () => {
    const inputs = [...addStoryPopup.getElementsByTagName('input')];
    const textareas = [...addStoryPopup.getElementsByTagName('textarea')];
    for (let textarea of textareas) {
        inputs.push(textarea);
    }
    return inputs;
};