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
    const popup = document.querySelector(evt.target);
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

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: evt.srcElement.querySelector('#title').value,
    link: evt.srcElement.querySelector('#link').value
  }
  addCard(createCard(card));
  closePopup(popupAdd);
  evt.srcElement.reset();
}

addButton.addEventListener('click', function () {
  openPopup(popupAdd);
  submitButton.classList.add('form__submit-disabled');
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
const elementTemplate = document.querySelector('#element').content;
const elementsTable = document.querySelector('.elements');

function createCard(card) {
  const elementInstance = elementTemplate.querySelector('.element').cloneNode(true);

  elementInstance.querySelector('.element__image').src = card.link;
  elementInstance.querySelector('.element__image').alt = card.name;
  elementInstance.querySelector('.element__title').innerText = card.name;


  const deleteButton = elementInstance.querySelector('.element__trash-button');

  deleteButton.addEventListener('click', () => {
    elementInstance.remove()
  });


  elementInstance.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });


  const elementImage = elementInstance.querySelector('.element__image');

  elementImage.addEventListener('click', () => {
    openPopup(popupImage);
    popupImageImg.src = card.link;
    popupImageImg.alt = card.name;
    popupImageTitle.innerText = card.name;
  });


  return elementInstance;
}

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
addCard(createCard(card))
});
//


