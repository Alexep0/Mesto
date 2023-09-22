import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._link = this._popupSelector.querySelector(".popup__img");
        this._caption = this._popupSelector.querySelector(".popup__caption");
    }

    open(link, name) {
        this._link.src = link;
        this._link.alt = name;
        this._caption.textContent = name;
        super.open();
    }
}