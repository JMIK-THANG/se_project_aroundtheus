import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._modalImage = document.querySelector(".modal__image");
    this._modalImageCaption = document.querySelector(".modal__description");
  }

  openModal({ name, link }) {
    this._modalImage.src = link;
    this._modalImage.alt = name;
    this._modalImageCaption.textContent = name;
    super.openModal();
  }
}
