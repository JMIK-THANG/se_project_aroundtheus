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

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}
function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputElements)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formEle, options) {
  const { inputSelector } = options;
  const { submitButtonSelector } = options;
  const inputElements = [...formEle.querySelectorAll(inputSelector)];
  const submitButton = formEle.querySelector(submitButtonSelector);
  inputElements.forEach((inputEle) => {
    inputEle.addEventListener("input", (e) => {
      checkInputValidity(formEle, inputEle, options);
      toggleButtonState(inputElements, submitButton, options);
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
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
enableValidation(config);
