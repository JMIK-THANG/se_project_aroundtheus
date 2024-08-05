function showInputError(formEle, inputEle, { inputErrorClass, errorClass }) {
  const errorMessageEle = formEle.querySelector(`#${inputEle.id}-error`);
  inputEle.classList.add(inputErrorClass);
  errorMessageEle.textContent = inputEle.validationMessage;
  errorMessageEle.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.classList.remove(errorClass);
  errorMessageEl.textContent = "";
}

function checkInputValidity(formEle, inputEle, options) {
  if (!inputEle.validity.valid) {
    return showInputError(formEle, inputEle, options);
  }
    hideInputError(formEle, inputEle, options);
  }

function toggleButtonState(inputEle, submitButton, { inactiveButtonClass }) {
  let foundInvalid = false;
  inputEle.forEach((input) => {
    if (!input.validity.valid) {
      foundInvalid = true;
    }
  });
  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    return submitButton.disabled = true;
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formEle, options) {
  const { inputSelector } = options;
  const inputElement = [...formEle.querySelectorAll(inputSelector)];
  const submitButton = formEle.querySelector(".modal__button");
  inputElement.forEach((inputEle) => {
    inputEle.addEventListener("input", (e) => {
      checkInputValidity(formEle, inputEle, options);
      toggleButtonState(inputEle, submitButton, options);
    });
  });
}
function enableValidation(options) {
  const formElement = [...document.querySelectorAll(options.formSelector)];
  formElement.forEach((formEle) => {
    formEle.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEle, options);
  });
}
const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "modal__error_visible",
};
enableValidation(config);
