const content = document.querySelector('.content');
const page = document.querySelector('.page');
const popupEdit = page.querySelector('.popup_type_edit')
const popupAdd = page.querySelector('.popup_type_add')

const editButton = content.querySelector('.profile__edit-button');
const closeEditButton = popupEdit.querySelector('.popup__button-close');

const addButton = content.querySelector('.profile__add-button');
const closeAddButton = popupAdd.querySelector('.popup__button-close');


const nameInput = popupEdit.querySelector('#name');
const jobInput = popupEdit.querySelector('#job');
const profTitle = content.querySelector('.profile__title');
const profDesc = content.querySelector('.profile__description');

function openEditForm() {
    popupEdit.classList.add('popup_opened');
    nameInput.value = profTitle.innerText;
    jobInput.value = profDesc.innerText;
}
function closeEditForm() {
    popupEdit.classList.remove('popup_opened');
}
function handleFormSubmit (evt) {
    evt.preventDefault(); 
    popupEdit.classList.remove('popup_opened');
    profTitle.innerText = nameInput.value;
    profDesc.innerText = jobInput.value;

}

editButton.addEventListener('click', openEditForm);
closeEditButton.addEventListener('click', closeEditForm);
popupEdit.addEventListener('submit', handleFormSubmit); 


function openAddForm() {
    popupAdd.classList.add('popup_opened');
}

function closeAddForm() {
    popupAdd.classList.remove('popup_opened');
}
function handleFormSubmit (evt) {
    evt.preventDefault(); 
    popupAdd.classList.remove('popup_opened');

}
addButton.addEventListener('click', openAddForm);
closeAddButton.addEventListener('click', closeAddForm);
popupAdd.addEventListener('submit', handleFormSubmit); 

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
  console.log(initialCards[1].name);