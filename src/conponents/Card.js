export default class Card {
    constructor(data, templateSelector, handleCardClick, currentUserId, onCardDelete, onCardLike, onCardUnlike) {
        this._onCardLike = onCardLike;
        this._onCardUnlike = onCardUnlike;
        this._onCardDelete = onCardDelete;
        this._name = data.name;
        this._id = data._id;
        this._link = data.link;
        this._likes = data.likes;
        this._owner = data.owner._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._currentUserId = currentUserId;
    }

    _getTemplate() {
        const card = this._templateSelector.querySelector('.element').cloneNode(true);
        return card
    }

    generateCard() {
        this._element = this._getTemplate();
        this._deleteButton = this._element.querySelector(".element__trash-button");
        this._likeButton = this._element.querySelector(".element__like-button");
        this._likesCount = this._element.querySelector(".element__like-counter");
        this._img = this._element.querySelector('.element__image');
        this._setEventListeners();
        this._img.src = this._link;
        this._img.alt = this._name;
        this._likesCount.textContent = this._likes.length;
        this._element.querySelector(".element__title").textContent = this._name;
        if (this._currentUserId !== this._owner) {
            this._deleteButton.style.display = "none";
        }

        this._likeButton.classList.toggle('element__like-button_active', this._likes.some(el => el._id === this._currentUserId));
        return this._element;
    }

    removeCard = () => {
        this._element.remove();
        this._element = null;
    }

    setLikes(likes) {
        this._likes = likes;
        this._likesCount.textContent = this._likes.length;
        this._likeButton.classList.toggle('element__like-button_active', this._likes.some(el => el._id === this._currentUserId));
    }

    _handleDeleteClick = () => {
        this._onCardDelete(this);
    }

    _handleClickLike = () => {
        if (this._likes.find(el => el._id === this._currentUserId)) {
            this._onCardUnlike(this);
            this._likeButton.classList.remove('element__like-button_active')
        } else {
            this._onCardLike(this);
            this._likeButton.classList.add('element__like-button_active')
        }
    }


    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleClickLike);
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteClick();
        });
        this._img.addEventListener('click', () => this._handleCardClick(this._name, this._link))
    }


}