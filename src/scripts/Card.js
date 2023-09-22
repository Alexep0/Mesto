export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const card = this._templateSelector.querySelector('.element').cloneNode(true);
        return card
    }

    generateCard() {
        this._element = this._getTemplate();
        this._deleteButton = this._element.querySelector(".element__trash-button");
        this._likeButton = this._element.querySelector(".element__like-button");
        this._img = this._element.querySelector('.element__image');
        this._setEventListeners();
        this._img.src = this._link;
        this._img.alt = this._name;
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
        this._img.addEventListener('click',() =>  this._handleCardClick(this._name, this._link))
    }

    
}