import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
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
import PopupWithConfirm from "../components/PopupWithConfirm.js";

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
    items: [],
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);
// section.renderItems();

// UserInfo instance
const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
});
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                              Instance for api                              */
/* -------------------------------------------------------------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5b58450e-f26a-4e94-99e4-d0bbf8319b25",
    "Content-Type": "application/json",
  },
});
api
  .getInitialCards()
  .then((res) => {
    section.setItems(res);
    section.renderItems();
  })
  .catch(console.error);

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}
function createCard(cardData) {
  const createCard = new Card(
    cardData,
    "#card__template",
    handlePreviewPicture,
    handleDeleteClick
  );
  const cardElement = createCard.getCardElement();
  return cardElement;
}

function handleProfileFormSubmit(inputvalues) {
  userInfo.setUserInfo(inputvalues.title, inputvalues.description);
  profileEditFormPopup.closeModal();
}
function handleAddCardFormSubmit(inputValues) {
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
// Cards Delete Confirm
const deleteConfirmPopup = new PopupWithConfirm({
  popupSelector: "popup-confirm-delete",
  handleFormSubmit: () => {},
});
deleteConfirmPopup.setEventListeners();
//this runs when you click the trash button on a card
function handleDeleteClick(cardId, card) {
  // here will be ID
  // popupWithConfirm should be opened with ID
  deleteConfirmPopup.openModal();
  deleteConfirmPopup.setSubmitHandler(() => {
    //this runs when you submit the delte-confirm modal
    deleteConfirmPopup.renderLoading(true);

    api
      .deleteCard(cardId)
      .then(() => {
        card.remove();
        deleteConfirmPopup.closeModal();
      })
      .catch(console.err)
      .finally(() => {
        deleteConfirmPopup.renderLoading(false);
      });
  });
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
