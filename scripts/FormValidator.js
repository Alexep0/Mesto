export default class FormValidator {
    constructor(validationConfig, form) {
        this._validationConfig = validationConfig;
        this._form = form;
        this._formsList = Array.from(document.querySelectorAll(this._validationConfig.form));
        this._inputsList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
        this._submitButton = this._form.querySelector(this._validationConfig.submitButtonSelector);
        this._inputsErrorElements = Array.from(this._form.querySelectorAll(".popup__error"));
    }
}