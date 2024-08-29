import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Profile Input
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// Add button
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector(".modal_add-card");
const addCardFormElement = addNewCardModal.querySelector(".modal__form");
// Edit Modal
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".modal_edit-profile");
const profileFormElement = profileEditModal.querySelector(".modal__form");
// Modal input
const modalTitleInput = document.querySelector(".modal__input-title");
const modalDescriptionInput = document.querySelector(
  ".modal__input-description"
);
// Ul
const cardListEl = document.querySelector(".cards__list");

// Card input, title and image for adding in the new card, template.
const cardTitleInput = addNewCardModal.querySelector(".modal__input-title");
const cardUrlInput = addNewCardModal.querySelector(".modal__input-description");
//Card template
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
// Preview
const previewImageModal = document.querySelector(".modal_preview-image");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewDescription = previewImageModal.querySelector(
  ".modal__description"
);
const closeButtons = [...document.querySelectorAll(".modal__close")];

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeEscHandler);
  modal.removeEventListener("click", closeEscHandler);
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeEscHandler);
  modal.addEventListener("click", closeOverlayHandler);
}
function closeEscHandler(e) {
  if (e.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}
function closeOverlayHandler(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.currentTarget);
  }
}

function renderCard(cardData, cardContainer) {
  const card = new Card(cardData, "#card__template", handlePreviewPicture);
  const cardElement = card.getCardElement();
  cardContainer.prepend(cardElement);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = modalTitleInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closeModal(profileEditModal);
}
function handleaddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addNewCardModal);
  addCardFormElement.reset();
}

// Card Temp
// function getCardElement(data) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImage = cardElement.querySelector(".card__image");
//   cardImage.src = data.link;
//   cardImage.alt = data.name;
//   const cardTitle = cardElement.querySelector(".card__title");
//   cardTitle.textContent = data.name;

//   const deleteButton = cardElement.querySelector(".delete__button");
//   deleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });

//   const likeButton = cardElement.querySelector(".card__like-button");
//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });
// cardImage.addEventListener("click", () => handlePreviewPicture(data));
//   return cardElement;
// }

// Preview pictures
function handlePreviewPicture(data) {
  previewDescription.textContent = data.name;
  previewImage.src = data.link;
  previewImage.alt = data.name;
  openModal(previewImageModal);
}

profileEditModal.addEventListener("submit", handleProfileFormSubmit);
addNewCardModal.addEventListener("submit", handleaddCardFormSubmit);
profileEditButton.addEventListener("click", () => {
  modalTitleInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
// Open button modal
addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));
// Close button modal

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const popup = closeButton.closest(".modal");
    closeModal(popup);
  });
});

initialCards.forEach((cardObj) => {
  renderCard(cardObj, cardListEl);
});

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addFormValidator = new FormValidator(config, addCardFormElement);
addFormValidator.enableValidation();
const profileFormValidator = new FormValidator(config, profileFormElement);
profileFormValidator.enableValidation();
