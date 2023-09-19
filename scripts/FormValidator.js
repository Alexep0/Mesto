export default class FormValidator {
    constructor(validationConfig, form) {
        this._validationConfig = validationConfig;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
        this._buttonElement = this._form.querySelector(this._validationConfig.submitButtonSelector);
        this._inputsErrorElements = Array.from(this._form.querySelectorAll(".popup__error"));
    }

    enableValidation() {
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._toggleButtonState(this._inputList, this._buttonElement, this._validationConfig.inactiveButtonClass);
        this._inputList.forEach((inputElement) => {
            this._setEventListeners(inputElement);
        });
    };

    _setEventListeners(inputElement){
        const inputErrorClass = this._validationConfig.inputErrorClass;
        const errorClass = this._validationConfig.errorClass;
        const inputList = this._inputList;
        const buttonElement = this._buttonElement;
        const inactiveButtonClass = this._validationConfig.inactiveButtonClass;
        inputElement.addEventListener('input',() => {
            this._checkInputValidity(inputElement, inputErrorClass, errorClass);
            this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
        this._form.addEventListener('submit',() => {
            this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
            this._buttonElement.disabled = true;
        });
    }


    _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
        const errorElement = formElement.querySelector(`.form__${inputElement.id}-error`);
        
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    };
    
    _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
        const errorElement = formElement.querySelector(`.form__${inputElement.id}-error`);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    };
    
    _checkInputValidity(inputElement, inputErrorClass, errorClass) {
        if (!inputElement.validity.valid) {
            this._showInputError(this._form, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
            inputElement.classList.add(this._validationConfig.invalidClass);
        } else {
            this._hideInputError(this._form, inputElement, inputErrorClass, errorClass);
            inputElement.classList.remove(this._validationConfig.invalidClass);
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
    
            return !inputElement.validity.valid;
        });
    };
    
    _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };
    
    
    /*enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.form__input',
        submitButtonSelector: '.form__submit',
        inactiveButtonClass: 'form__submit-disabled',
        inputErrorClass: 'form__input-error',
        errorClass: 'form__input-error_active'
    });*/
}