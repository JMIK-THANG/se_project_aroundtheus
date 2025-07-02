export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeButtonClick
  ) {
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._cardId = _id;
    this.isLiked = isLiked;
    this._name = name;
    this._link = link;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardSelector = cardSelector; // Template
  }

  getId() {
    return this._cardId;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      //this._handleLikeIcon();
      this._handleLikeButtonClick(this);
    });
    this._deleteButton = this._cardElement.querySelector(".delete__button");
    this._deleteButton.addEventListener("click", (e) =>
      this._handleDeleteClick(this, this._cardId)
    );
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  likeCardOnDom() {
    this._likeButton.classList.add("card__like-button_active");
  }
  unLikeCardOnDom() {
    this._likeButton.classList.remove("card__like-button_active");
  }
  remove() {
    this._cardElement.remove();
  }

  _setLikeOnPageLoad() {
    if (this.isLiked) {
      this.likeCardOnDom();
    }
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    this._setLikeOnPageLoad();
    return this._cardElement;
  }
}
