const page = document.querySelector('.page');
const content = document.querySelector('.content');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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
  closePopup(popupEdit)
  profTitle.innerText = nameInput.value;
  profDesc.innerText = jobInput.value;
});
//


// popup Новое место
const popupAdd = page.querySelector('.popup_type_add')

const addButton = content.querySelector('.profile__add-button');
const closeAddButton = popupAdd.querySelector('.popup__button-close');


function openAddForm() {
  popupAdd.classList.add('popup_opened');
}

function closeAddForm() {
  popupAdd.classList.remove('popup_opened');
}
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const title = evt.srcElement.querySelector('#title').value;
  const link = evt.srcElement.querySelector('#link').value;
  initialCards.unshift({ name: title, link: link })
  renderCards(initialCards);
  popupAdd.classList.remove('popup_opened');

}
addButton.addEventListener('click', function () {
  openPopup(popupAdd);
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

function createCard(card, index) {
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

  const elementsTable = document.querySelector('.elements');
  elementsTable.appendChild(elementInstance);

  const elementImage = elementInstance.querySelector('.element__image');

  elementImage.addEventListener('click', () => {
    openPopup(popupImage);
    popupImageImg.src = card.link;
    popupImageImg.alt = card.name;
    popupImageTitle.innerText = card.name;
  });


  return elementInstance;
}

function renderCards(cardsData) {
  const elementsTable = document.querySelector('.elements');
  elementsTable.innerText = '';
  cardsData.forEach(createCard);
}


popupImageCloseButton.addEventListener('click', function () {
  closePopup(popupImage);
});


renderCards(initialCards);


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
//


