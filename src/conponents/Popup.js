export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._openingSelector = "popup_opened";
        this._buttonClose = this._popup.querySelector(".popup__button-close");
        this._handleBtnCrossClose = this._handleBtnCrossClose.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        document.addEventListener("keydown", this._handleEscClose);
        this._popup.classList.add(this._openingSelector);
    }

    close() {
        document.removeEventListener("keydown", this._handleEscClose);
        this._popup.classList.remove(this._openingSelector);
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

        this._popup.addEventListener("mousedown", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });

        this._buttonClose.addEventListener("click", this._handleBtnCrossClose);
    }
}