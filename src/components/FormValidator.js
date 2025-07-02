class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._element = formElement;
  }

  _showInputError(inputEle) {
    this._errorMessageEle = this._element.querySelector(
      `#${inputEle.id}-error`
    );
    inputEle.classList.add(this._inputErrorClass);
    this._errorMessageEle.textContent = inputEle.validationMessage;
    this._errorMessageEle.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    this._errorMessageEl = this._element.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.classList.remove(this._errorClass);
    this._errorMessageEl.textContent = "";
  }
  _checkInputValidity(inputEle) {
    if (!inputEle.validity.valid) {
      return this._showInputError(inputEle);
    }
    this._hideInputError(inputEle);
  }
  _hasInvalidInput() {
    return this._inputElements.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }
  _enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _setEventListeners() {
    this._inputElements = [
      ...this._element.querySelectorAll(this._inputSelector),
    ];

    this._submitButton = this._element.querySelector(
      this._submitButtonSelector
    );
    this._inputElements.forEach((inputEle) => {
      inputEle.addEventListener("input", (e) => {
        this._checkInputValidity(inputEle);
        this._toggleButtonState(inputEle);
      });
    });
  }

  enableValidation() {
    this._element.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
