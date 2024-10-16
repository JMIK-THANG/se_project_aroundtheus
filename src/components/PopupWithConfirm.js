import Popup from "./Popup.js";
export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector}) {
    super({popupSelector});

    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__button");
  }
  // New push 

  setSubmitHandler(handler) {
    this._handleFormSubmit = handler;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "save...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
