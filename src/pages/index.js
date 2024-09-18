import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
  addNewCardButton,
  config,
  modalDescriptionInput,
  modalTitleInput,
  addCardFormElement,
  profileFormElement,
  profileEditButton,
  cardListEl,
} from "../utils/constants.js";

/* -------------------------------------------------------------------------- */
/*                               Class Instances                              */
/* -------------------------------------------------------------------------- */
const addFormValidator = new FormValidator(config, addCardFormElement);
addFormValidator.enableValidation();
const profileFormValidator = new FormValidator(config, profileFormElement);
profileFormValidator.enableValidation();

const profileEditFormPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileFormSubmit,
});
profileEditFormPopup.setEventListeners();

const addCardFormPopup = new PopupWithForm({
  popupSelector: "#modal-add-card",
  handleFormSubmit: handleAddCardFormSubmit,
});
addCardFormPopup.setEventListeners();

const popupWithImage = new PopupWithImage({
  popupSelector: ".modal_preview-image",
});
popupWithImage.setEventListeners();

// Section instance
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);
section.renderItems();

// UserInfo instance
const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
});
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}
function createCard(cardData) {
  const createCard = new Card(
    cardData,
    "#card__template",
    handlePreviewPicture
  );
  const cardElement = createCard.getCardElement();
  return cardElement;
}

function handleProfileFormSubmit(inputvalues) {
  userInfo.setUserInfo(inputvalues.title, inputvalues.description);
  profileEditFormPopup.closeModal();
}
function handleAddCardFormSubmit(inputValues) {
  debugger;
  const name = inputValues.title;
  const link = inputValues.url;
  renderCard({ name, link }, cardListEl);

  addCardFormPopup.closeModal();
  addCardFormElement.reset();
  addFormValidator.disableSubmitButton();
}

// Preview pictures
function handlePreviewPicture(data) {
  popupWithImage.openModal(data);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                               */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  // use getInfo method
  const userData = userInfo.getUserInfo();
  modalTitleInput.value = userData.name;
  modalDescriptionInput.value = userData.description;
  profileEditFormPopup.openModal();
});
// Open button modal
addNewCardButton.addEventListener("click", () => addCardFormPopup.openModal());
