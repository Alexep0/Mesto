import PopupWithForm from "./PopupWithForm.js";
export default class PopupWithEditForm extends PopupWithForm {
    constructor(popupSelector, buttonOpen, handleFormSubmit, info) {
        super(popupSelector, buttonOpen, handleFormSubmit);
        this._info = info;
        this.popupSelector = popupSelector;
        this._form = this.popupSelector.querySelector('.popup__form');
    }

    open(){
        this._info.getUserInfo(this._form.querySelector('#name').value, this._form.querySelector('#job').value);
        const infodata = this._info.getUserInfo();
        this._form.querySelector('#name').value = infodata.name;
        this._form.querySelector('#job').value = infodata.job;
        super.open();
    }

}
