const page = document.querySelector('.page');
const content = document.querySelector('.content');

// popup Профиль
const popupEdit = page.querySelector('.popup_type_edit')

const editButton = content.querySelector('.profile__edit-button');
const closeEditButton = popupEdit.querySelector('.popup__button-close');

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

function handleFormSubmit(evt) {
  evt.preventDefault();
  popupEdit.classList.remove('popup_opened');
  profTitle.innerText = nameInput.value;
  profDesc.innerText = jobInput.value;

}

editButton.addEventListener('click', openEditForm);
closeEditButton.addEventListener('click', closeEditForm);
popupEdit.addEventListener('submit', handleFormSubmit);
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
function handleFormSubmit(evt) {
  evt.preventDefault();
  const title = evt.srcElement.querySelector('#title').value;
  const link = evt.srcElement.querySelector('#link').value;
  initialCards.unshift({name:title, link:link})
  renderCards(initialCards);
  popupAdd.classList.remove('popup_opened');

}
addButton.addEventListener('click', openAddForm);
closeAddButton.addEventListener('click', closeAddForm);
popupAdd.addEventListener('submit', handleFormSubmit);
//


// Element Карточка
function renderCard(card, index) {
  const elementTemplate = document.querySelector('#element').content;
  const elementsTable = document.querySelector('.elements');
  const elementInstance = elementTemplate.querySelector('.element').cloneNode(true);
  const deleteButton = elementInstance.querySelector('.element__trash-button');
  elementInstance.querySelector('.element__image').src = card.link;
  elementInstance.querySelector('.element__title').innerText = card.name;
  elementsTable.appendChild(elementInstance);
  function deleteCard() {
    deleteButton.removeEventListener('click', deleteCard);
    elementsTable.removeChild(elementInstance);
    delete initialCards[index];
  }
  
  deleteButton.addEventListener('click', deleteCard);
  elementInstance.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
    });


}

function renderCards(cardsData) {
  const elementsTable = document.querySelector('.elements');
  elementsTable.innerText = '';
  cardsData.forEach(renderCard);
}



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

renderCards(initialCards);


//


