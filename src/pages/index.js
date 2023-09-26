import "../pages/index.css";
import Card from "../conponents/Card.js";
import FormValidator from "../conponents/FormValidator.js";
import PopupWithForm from "../conponents/PopupWithForm.js";
import PopupWithImage from "../conponents/PopupWithImage.js";
import PopupWithConfirmation from "../conponents/PopupWithConfirmation.js";
import Section from "../conponents/Section.js";
import UserInfo from "../conponents/UserInfo.js";
import { validationConfig } from "../utils/data.js";
import Api from "../conponents/Api.js";
const content = document.querySelector('.content');

const profTitle = content.querySelector('.profile__title');
const profDesc = content.querySelector('.profile__description');
const avatar = content.querySelector('.profile__avatar');
const avatarButton = content.querySelector('.profile__avatar-cont')
const elementsTable = document.querySelector('.elements');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: 'a7be79c3-197b-4b62-bc05-c705055e13fb',
    'Content-Type': 'application/json'
  }
}); 

const userInfo = new UserInfo(profTitle, profDesc, avatar);

const userInfoPromise = api.getUserInfo()
.catch((err) => {
  console.log(err);
})


const section = new Section([], renderCards, elementsTable)
function renderCards(card) {
  return createCard(card, elementTemplate, popupWithImg.open.bind(popupWithImg, card.link, card.name))
}

const cardsDataPromise = api.getInitialCards()
.catch((err) => {
  console.log(err);
})

Promise.all([userInfoPromise, cardsDataPromise]).then((promises) => {
  userInfo.setUserInfo(promises[0]);
  section.renderItems(promises[1]);
})
.catch((err) => {
  console.log(err);
})

const formList = Array.from(document.querySelectorAll('.popup__form'));
const elementTemplate = document.querySelector('#element').content;
const popupEdit = '.popup_type_edit';
const popupAdd = '.popup_type_add';
const popupDel = '.popup_type_delete';
const popupImage = '.popup_type_image';
const popupAvatar = '.popup_type_avatar';
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');

const popupWithImg = new PopupWithImage(popupImage);

formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

function setEditButtonClick() {
  //setInputValues вставляет в форму объект данных, полученный из getUserInfo.
  editButton.addEventListener('click', () => popupEditProfile.setInputValues(userInfo.getUserInfo()))
}

function handleOpenDeletePopup(card) {
  popupConfirmation.open(() => api.deleteCard(card._id).then(res => card.removeCard()));
}


function handleLike(card) {
  api.likeCard(card._id)
  .then((res) => {
    card.setLikes(res.likes);
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleDislike(card) {
  api.removeLikeCard(card._id)
  .then((res) => {
    card.setLikes(res.likes);
  })
  .catch((err) => {
    console.log(err);
  })
}

function createCard(data, templateSelector, onCardClick) {
  const card = new Card(data, templateSelector, onCardClick, userInfo.getUserInfo().id, handleOpenDeletePopup, handleLike, handleDislike);
  return card.generateCard();
};



const popupEditProfile = new PopupWithForm(popupEdit, editButton, handleFormEditSubmit);
function handleFormEditSubmit(inputs) {
  popupEditProfile.renderLoading(true);
  return api.setUserInfo({ name: inputs.name, about: inputs.job })
    .then(res => {
      userInfo.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    })
};

const popupAddCard = new PopupWithForm(popupAdd, addButton, handleFormAddSubmit);

function handleFormAddSubmit(inputs) {
  popupAddCard.renderLoading(true);
  const card = {
    name: inputs.title,
    link: inputs.link
  };
  return api.addNewCard(card)
  .then((res) => {
    section.addItem(renderCards(res));
    popupAddCard.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupAddCard.renderLoading(false);
  })
};

const avatarForm = new PopupWithForm(popupAvatar, avatarButton, handleAvatarSubmit);
function handleAvatarSubmit(inputs) {
  avatarForm.renderLoading(true);
  return api.setUserAvatar(inputs.link)
    .then(res => {
      userInfo.setUserInfo(res);
      avatarForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarForm.renderLoading(false);
    })
};

const popupConfirmation = new PopupWithConfirmation(popupDel);

avatarForm.setEventListeners();
popupConfirmation.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupWithImg.setEventListeners();
setEditButtonClick();