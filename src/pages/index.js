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
  profileImage,
  profilePictureButton,
  profilePictureModal,
  profileDescription,
} from "../utils/constants.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

/* -------------------------------------------------------------------------- */
/*                               Class Instances                              */
/* -------------------------------------------------------------------------- */
const addFormValidator = new FormValidator(config, addCardFormElement);
addFormValidator.enableValidation();
const profileFormValidator = new FormValidator(config, profileFormElement);
profileFormValidator.enableValidation();
const editPictureValidator = new FormValidator(config, profilePictureModal);
editPictureValidator.enableValidation();

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
  profilePictureSelector: ".profile__image",
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
    authorization: "45288969-7703-40e1-b9c1-60a8b41e2f8f",
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
  const card = new Card(
    cardData,
    "#card__template",
    handlePreviewPicture,
    handleDeleteClick,
    handleLikeButtonClick
  );
  const cardElement = card.getCardElement();
  return cardElement;
}

function handleProfileFormSubmit(inputvalues) {
  // userInfo.setUserInfo(inputvalues.title, inputvalues.description);

  api.updateUserInfo(inputvalues.title, inputvalues.description).then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    profileEditFormPopup.closeModal();
  });
}
api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setUserPicture(res.avatar);
  })
  .catch((err) => {
    alert("Could not get user info!");
    console.error(err);
  });
function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;

  api
    .addNewCards(name, link)
    .then((cardData) => {
      renderCard(cardData, cardListEl);
    })
    .catch((err) => {
      alert("Could not add a card!");
      console.error(err);
    })
    .finally(() => {
      deleteConfirmPopup.renderLoading(false);
    });

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
  popupSelector: "#popup-confirm-delete",
});
deleteConfirmPopup.setEventListeners();
//this runs when you click the trash button on a card
function handleDeleteClick(card, cardId) {
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

function handleLikeButtonClick(card) {
  console.log(card.isLiked);

  //don't forget to add catch blocks

  //check if the card is liked or not
  if (card.isLiked) {
    //if it is liked, we unlike it on the server and then unlike it on the Dom, and change isLiked to false
    api.disLikeCard(card.getId()).then(() => {
      card.unLikeCardOnDom();
      this.isLiked = false;
    });
  } else {
    //if it's not, we like it on the server, and then like it on the Dom, and change isLiked to true
    api.likeCard(card.getId()).then(() => {
      card.likeCardOnDom();
      this.isLiked = true;
    });
  }
}
// Like Dislike funditipon
// function handleLike(evt, id) {
//   console.log(id);
//   const isLiked = evt.target.classList.contains("card__like-button_liked");
//   api
//     .handleLike(id, isLiked)
//     .then(() => {
//       evt.target.classList.toggle("card__like-button_liked");
//     })
//     .catch(console.error);
// }
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
// Open button for profile picture change
/* -------------------------------------------------------------------------- */
/*                             profile info change                            */
/* -------------------------------------------------------------------------- */

// Profile Picture change
const profilePicturePopup = new PopupWithForm({
  popupSelector: "#profile-picture-modal",
  handleFormSubmit: (pictureData) => {
    const pictureUrl = pictureData.picture;
    if (!pictureUrl) {
      console.log("URL missing");
      return;
    }
    // profilePicturePopup.setButtonText(true);
    api
      .updateUserPicture(pictureUrl)
      .then((pictureData) => {
        console.log(pictureData);
        userInfo.setUserPicture(pictureData.avatar);

        editPictureValidator.disableSubmitButton();
        profilePicturePopup.closeModal();
      })
      .catch((err) => {
        console.error("Fail", err);
      })
      .finally(() => {
        // profilePicturePopup.setButtonText();
      });
  },
});
profilePicturePopup.setEventListeners();
profilePictureButton.addEventListener("click", () => {
  profilePicturePopup.openModal();
});
