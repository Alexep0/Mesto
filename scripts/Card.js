export default class Card {
    constructor({data}, templateSelector) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const card = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return card
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImg = this._element.querySelector(".element__image");
        this._deleteButton = this._element.querySelector(".element__trash-button");
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        this._cardTitle = this._element.querySelector(".element__title").textContent = this._name;
        this._likeButton = this._element.querySelector(".element__like-button");
        this._setEventListeners();
        return this._element;
    }

    _LikeCard() {
        this._likeButton.classList.toggle("element__button-like_active");
    }

    _removeCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () =>{
            this._LikeCard()
        });
        this._deleteButton.addEventListener('click', () =>{
            this._removeCard()
        });
    }

    
}