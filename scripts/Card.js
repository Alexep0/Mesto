export default class Card {
    constructor(data, templateSelector, onCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._onCardClick = onCardClick;
    }

    _getTemplate() {
        const card = this._templateSelector.querySelector('.element').cloneNode(true);
        return card
    }

    generateCard() {
        this._element = this._getTemplate();
        this._deleteButton = this._element.querySelector(".element__trash-button");
        this._likeButton = this._element.querySelector(".element__like-button");
        this._imgPopup = this._element.querySelector('.element__image');
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector(".element__title").textContent = this._name;
        return this._element;
    }

    _removeCard = () => {
        this._element.remove();
    }

    
    _setEventListeners() {
        this._likeButton.addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__like-button_active')
        });
        this._deleteButton.addEventListener('click', () => {
            this._removeCard();
        });
        this._imgPopup.addEventListener('click',() =>  this._onCardClick(this._name, this._link))
    }

    
}