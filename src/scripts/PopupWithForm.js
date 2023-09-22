import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, buttonOpen, handleFormSubmit) {
        super(popupSelector);
        this._buttonOpen = buttonOpen;
        this._handleFormSubmit = handleFormSubmit;
        this._form = popupSelector.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", () => {
            this._onSubmit;
            this._getInputValues();
            this.close();
        });
        this._buttonOpen.addEventListener('click', ()=>{
            this.open();
        });
    }

    _getInputValues() {
        this._inputsList = Array.from(this._form.querySelectorAll('.form__input')); 
        this._formValues = {};
        this._inputsList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        this._handleFormSubmit(this._formValues);
    }

    _onSubmit(evt) {
        evt.preventDefault();
    }

    close() {
        this._form.reset();
        super.close();
    }
}