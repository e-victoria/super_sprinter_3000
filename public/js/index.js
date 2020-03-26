const addStoryBtn = document.getElementById('add-story-btn');
const addStoryPopup = document.querySelector('.add-story-popup');

addStoryBtn.onclick = (e) => {
    const closePopupBtn = document.querySelector('.popup__btn--cancel');
    e.preventDefault();
    addStoryPopup.classList.add('add-story-popup--opened');

    closePopupBtn.onclick = (e) => {
        e.preventDefault();
        addStoryPopup.classList.remove('add-story-popup--opened');
    }
};