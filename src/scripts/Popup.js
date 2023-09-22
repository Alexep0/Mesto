export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._openingSelector = "popup_opened";
        this._buttonClose = this._popupSelector.querySelector(".popup__button-close");
        this._handleBtnCrossClose = this._handleBtnCrossClose.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        document.addEventListener("keydown", this._handleEscClose);
        this._popupSelector.classList.add(this._openingSelector);
    }

    close() {
        document.removeEventListener("keydown", this._handleEscClose);
        this._popupSelector.classList.remove(this._openingSelector);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleBtnCrossClose() {
        this.close();
    }

    setEventListeners() {
        
        this._popupSelector.addEventListener("mousedown", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });

        this._buttonClose.addEventListener("click", this._handleBtnCrossClose);
    }
}