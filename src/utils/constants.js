// export const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
//   },
// ];
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Profile Input
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
// Add button
export const addNewCardButton = document.querySelector(".profile__add-button");
export const addNewCardModal = document.querySelector(".modal_add-card");
export const addCardFormElement = addNewCardModal.querySelector(".modal__form");
// Edit Modal
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileEditModal = document.querySelector(".modal_edit-profile");
export const profileFormElement =
  profileEditModal.querySelector(".modal__form");
// Modal input
export const modalTitleInput = document.querySelector(".modal__input-title");
export const modalDescriptionInput = document.querySelector(
  ".modal__input-description"
);
// Ul
export const cardListEl = document.querySelector(".cards__list");

// Card input, title and image for adding in the new card, template.
export const cardTitleInput = addNewCardModal.querySelector(
  ".modal__input-title"
);
export const cardUrlInput = addNewCardModal.querySelector(
  ".modal__input-description"
);
//Card template
export const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
// Preview
export const previewImageModal = document.querySelector(".modal_preview-image");
export const previewImage = previewImageModal.querySelector(".modal__image");
export const previewDescription = previewImageModal.querySelector(
  ".modal__description"
);
export const closeButtons = [...document.querySelectorAll(".modal__close")];
