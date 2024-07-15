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

// Add button
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector(".modal__add-button");
const addCardFormElement = addNewCardModal.querySelector(".modal__form");
// Edit Modal
const profileEditButton = document.querySelector(".profile__edit_button");
const profileFormElement = profileEditButton.querySelector(".modal__form");
const profileEditModal = document.querySelector(".profile__edit_modal");
const profileModalClose = profileEditModal.querySelector(".modal__close");
const addModalClose = addNewCardModal.querySelector(".modal__close");
// Profile Input
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// Modal input
const modalTitleInput = document.querySelector(".form__input-title");
const modalDescriptionInput = document.querySelector(
  ".form__input-description"
);
// Ul
const cardListEl = document.querySelector(".cards__list");

// Card input, title and image for adding in the new card, template.
const cardTitleInput = addNewCardModal.querySelector(".form__input-title");
const cardUrlInput = addNewCardModal.querySelector(".form__input-description");
//Card template
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
// Preview
const previewImageModal = document.querySelector(".preview__image_modal");
const previewCloseButton = previewImageModal.querySelector(
  ".preview__close_button"
);
const previewImage = previewImageModal.querySelector(".preview__image");
const previewDescription = previewImageModal.querySelector(
  ".preview__description"
);

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
function openModal(modal) {
  modal.classList.add("modal_opened");
}
function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
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
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;
  
  const deleteButton = cardElement.querySelector(".delete__button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  cardImage.addEventListener("click", () => handlePreviewPicture(data));
  return cardElement;
}
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
profileModalClose.addEventListener("click", () => closeModal(profileEditModal));
addModalClose.addEventListener("click", () => closeModal(addNewCardModal));

previewCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);
initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListEl.prepend(cardElement);
});
