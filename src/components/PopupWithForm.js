import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector(".modal__form");
    this._submitBtn = this._form.querySelector(".modal__button");

    this._submitBtnText = this._submitBtn.textContent;
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = Array.from(
      this._popupElement.querySelectorAll(".modal__input")
    );
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }
  // add 2 params: isLoading and loadingText with a default text

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      // here we return back the initial text. So, you don’t need to bother yourself about it
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues()); // parameter problem
      this._form.reset();
    });
  }
}
