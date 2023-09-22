import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._link = popupSelector.querySelector(".popup__img");
        this._caption = popupSelector.querySelector(".popup__caption");
    }

    open(link, name) {
        console.log(this._link);
        this._link.src = link;
        this._link.alt = name;
        this._caption.textContent = name;
        super.open();
    }

    close() {
        super.close();
    }
}