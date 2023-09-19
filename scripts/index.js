import Card  from "./Card.js";
import FormValidator from "./FormValidator.js";
const formList = Array.from(document.querySelectorAll('.popup__form'));
const elementTemplate = document.querySelector('#element').content;

formList.forEach((formElement) => {
  const formValidator = new FormValidator({
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit-disabled',
    inputErrorClass: 'form__input-error',
    errorClass: 'form__input-error_active',
    invalidClass: 'form__input-invalid'
  }, formElement);

  formValidator.enableValidation();
})

const openImgPopup = (name, link) => {
  openPopup(popupImage);
  popupImageImg.src = link;
  popupImageImg.alt = name;
  popupImageTitle.innerText = name;
};

const page = document.querySelector('.page');
const content = document.querySelector('.content');

// фунции открытия и закрытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('mousedown', closePopupOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('mousedown', closePopupOverlay);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popup = evt.target;
    closePopup(popup);
  }
}
//


// popup Профиль
const popupEdit = page.querySelector('.popup_type_edit')
const editButton = content.querySelector('.profile__edit-button');
const closeEditButton = popupEdit.querySelector('.popup__button-close');
const nameInput = popupEdit.querySelector('#name');
const jobInput = popupEdit.querySelector('#job');
const profTitle = content.querySelector('.profile__title');
const profDesc = content.querySelector('.profile__description');

editButton.addEventListener('click', function () {
  openPopup(popupEdit);
  nameInput.value = profTitle.innerText;
  jobInput.value = profDesc.innerText;
});
closeEditButton.addEventListener('click', function () {
  closePopup(popupEdit)
});
popupEdit.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profTitle.innerText = nameInput.value;
  profDesc.innerText = jobInput.value;
  closePopup(popupEdit)
});
//

// popup Новое место
const popupAdd = page.querySelector('.popup_type_add')

const addButton = content.querySelector('.profile__add-button');
const closeAddButton = popupAdd.querySelector('.popup__button-close');
const submitButton = popupAdd.querySelector('.form__submit');

function createCard(data, templateSelector, onCardClick) {
  const createeCard = new Card(data, templateSelector, onCardClick);
  addCard(createeCard.generateCard());
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: evt.srcElement.querySelector('#title').value,
    link: evt.srcElement.querySelector('#link').value
  }
  createCard(card, elementTemplate, openImgPopup);
  closePopup(popupAdd);
  evt.srcElement.reset();
}

addButton.addEventListener('click', function () {
  openPopup(popupAdd);
  new FormValidator({submitButtonSelector: '.form__submit', inactiveButtonClass: 'form__submit-disabled'}, popupAdd.querySelector('.popup__form')).disableSubmitButton();
  submitButton.disabled = true;
});
closeAddButton.addEventListener('click', function () {
  closePopup(popupAdd);
});
popupAdd.addEventListener('submit', handleAddFormSubmit);
//


// Element Карточка
const popupImage = page.querySelector('.popup_type_image');
const popupImageImg = popupImage.querySelector('.popup__img');
const popupImageTitle = popupImage.querySelector('.popup__caption');
const popupImageCloseButton = popupImage.querySelector('.popup__button-close');
const elementsTable = document.querySelector('.elements');

function addCard(card) {
  elementsTable.prepend(card)
}

popupImageCloseButton.addEventListener('click', function () {
  closePopup(popupImage);
});


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


initialCards.forEach((card) =>{
  createCard(card, elementTemplate, openImgPopup);
});

