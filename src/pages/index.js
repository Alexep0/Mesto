import "../pages/index.css";
import Card  from "../conponents/Card.js";
import FormValidator from "../conponents/FormValidator.js";
import PopupWithForm  from "../conponents/PopupWithForm.js";
import PopupWithImage  from "../conponents/PopupWithImage.js";
import Section  from "../conponents/Section.js";
import UserInfo  from "../conponents/UserInfo.js";
import {validationConfig, initialCards} from "../utils/data.js";

const content = document.querySelector('.content');
const formList = Array.from(document.querySelectorAll('.popup__form'));
const profTitle = content.querySelector('.profile__title');
const profDesc = content.querySelector('.profile__description');
const elementTemplate = document.querySelector('#element').content;
const elementsTable = document.querySelector('.elements');
const popupEdit = '.popup_type_edit';
const popupAdd = '.popup_type_add';
const popupImage = '.popup_type_image';
const userInfo = new UserInfo(profTitle, profDesc);
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');

const popupWithImg = new PopupWithImage(popupImage);
popupWithImg.close();

formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

function profileData() {
  editButton.addEventListener('click', () => editForm.setInputValues(userInfo.getUserInfo()))
}

function createCard(data, templateSelector, onCardClick) {
  const card = new Card(data, templateSelector, onCardClick);
  return card.generateCard();
};

const section = new Section(initialCards, renderCards, elementsTable)
function renderCards(card){
  return createCard(card, elementTemplate, popupWithImg.open.bind(popupWithImg, card.link, card.name))
}


const editForm = new PopupWithForm(popupEdit, editButton, handleFormEditSubmit);
function handleFormEditSubmit(inputs){
  userInfo.setUserInfo(inputs.name, inputs.job);
  profileData();
};

const addForm = new PopupWithForm(popupAdd, addButton, handleFormAddSubmit);
function handleFormAddSubmit(inputs){
  const card = {
    name: inputs.title,
    link: inputs.link
  };
  section.addItem(renderCards(card));
};

section.renderItems();
editForm.setEventListeners();
addForm.setEventListeners();
popupWithImg.setEventListeners();
profileData();