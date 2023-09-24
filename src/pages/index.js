import "../pages/index.css";
import Card from "../conponents/Card.js";
import FormValidator from "../conponents/FormValidator.js";
import PopupWithForm from "../conponents/PopupWithForm.js";
import PopupWithImage from "../conponents/PopupWithImage.js";
import PopupWithConfirmation from "../conponents/PopupWithConfirmation.js";
import Section from "../conponents/Section.js";
import UserInfo from "../conponents/UserInfo.js";
import { validationConfig } from "../utils/data.js";
import { api } from "../conponents/Api.js";
const content = document.querySelector('.content');

const profTitle = content.querySelector('.profile__title');
const profDesc = content.querySelector('.profile__description');
const avatar = content.querySelector('.profile__avatar');
const avatarButton = content.querySelector('.profile__avatar-cont')
const elementsTable = document.querySelector('.elements');

let userInfo;
await api.getUserInfo()
  .then((data) => {
    userInfo = new UserInfo(profTitle, profDesc, avatar, data);
  })


function renderCards(card) {
  return createCard(card, elementTemplate, popupWithImg.open.bind(popupWithImg, card.link, card.name))
}

const section = new Section([], renderCards, elementsTable)


api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data)
})


api.getInitialCards().then((data) => {
  section.renderItems(data);
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
popupWithImg.close();

formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

function setEditButtonClick() {
  //setInputValues вставляет в форму объект данных, полученный из getUserInfo.
  editButton.addEventListener('click', () => editForm.setInputValues(userInfo.getUserInfo()))
}

function handleOpenDeletePopup(card) {
  deleteForm.open(() => api.deleteCard(card._id).then(res => card.removeCard()));
}


function handleLike(card) {
  api.likeCard(card._id).then((res) => {
    card.setLikes(res.likes);
  })
}

function handleDislike(card) {
  api.removeLikeCard(card._id).then((res) => {
    card.setLikes(res.likes);
  })
}

function createCard(data, templateSelector, onCardClick) {
  const card = new Card(data, templateSelector, onCardClick, userInfo.getUserInfo().id, handleOpenDeletePopup, handleLike, handleDislike);
  return card.generateCard();
};



const editForm = new PopupWithForm(popupEdit, editButton, handleFormEditSubmit);
function handleFormEditSubmit(inputs) {
  return api.setUserInfo({ name: inputs.name, about: inputs.job })
    .then(res => {
      userInfo.setUserInfo(res);
    })
};

const addForm = new PopupWithForm(popupAdd, addButton, handleFormAddSubmit);

function handleFormAddSubmit(inputs) {
  const card = {
    name: inputs.title,
    link: inputs.link
  };

  return api.addNewCard(card).then((res) => {
    section.addItem(renderCards(res))
  })

};

const avatarForm = new PopupWithForm(popupAvatar, avatarButton, handleAvatarSubmit);
function handleAvatarSubmit(inputs) {
  api.setUserAvatar(inputs.link)
    .then(res => {
      userInfo.setUserInfo(res);
    })
};

const deleteForm = new PopupWithConfirmation(popupDel);

avatarForm.setEventListeners();
deleteForm.setEventListeners();
editForm.setEventListeners();
addForm.setEventListeners();
popupWithImg.setEventListeners();
setEditButtonClick();