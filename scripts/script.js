let content = document.querySelector('.content');
let page = document.querySelector('.page');

let editButton = content.querySelector('.profile__edit-button');
let closeEditButton = page.querySelector('.popup__button-close');

let formElement = page.querySelector('.popup');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');
let profTitle = content.querySelector('.profile__title');
let profDesc = content.querySelector('.profile__description');

function openForm() {
    formElement.classList.add('popup_opened');
    nameInput.value = profTitle.innerText;
    jobInput.value = profDesc.innerText;
}

function closeForm() {
    formElement.classList.remove('popup_opened');
}
function handleFormSubmit (evt) {
    evt.preventDefault(); 
    formElement.classList.remove('popup_opened');
    profTitle.innerText = nameInput.value;
    profDesc.innerText = jobInput.value;

}

editButton.addEventListener('click', openForm);
closeEditButton.addEventListener('click', closeForm);
formElement.addEventListener('submit', handleFormSubmit); 