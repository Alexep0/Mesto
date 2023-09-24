import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, buttonOpen, handleFormSubmit) {
        super(popupSelector);
        this._buttonOpen = buttonOpen;
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.form__submit');
        this._inputsList = Array.from(this._form.querySelectorAll('.form__input'));
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", async (evt) => {
            evt.preventDefault();
            this._getInputValues();
            this.renderLoading(true);
            await this._handleFormSubmit(this._formValues);
            this.close();
            this.renderLoading(false);
        });
        this._buttonOpen.addEventListener('click', () => {
            this.open();
        });
    }

    _getInputValues() {
        this._formValues = {};
        this._inputsList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...'
        } else {
            this._submitButton.textContent = 'СохранитьJJJJ'
        }
    }


    close() {
        this._form.reset();
        super.close();
    }

    setInputValues(data) {
        this._inputsList.forEach((input) => {
            input.value = data[input.name];
        });
    }
}