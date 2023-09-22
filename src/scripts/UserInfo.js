export default class UserInfo {
    constructor(name, job, popupSelector) {
        this._name = name;
        this._job = job;
        this._popupSelector = document.querySelector(popupSelector);
        this._form = this._popupSelector.querySelector('.popup__form');
        this._editButton = document.querySelector('.profile__edit-button');
    }

    setEventListeners() {
        this._editButton.addEventListener('click', ()=>{
            this._form.querySelector('#name').value = this._name.textContent;
            this._form.querySelector('#job').value = this._job.textContent;
        });
    }

    setUserInfo(nameUser, jobUser) {
        this._name.textContent = nameUser;
        this._job.textContent = jobUser;
    }
}