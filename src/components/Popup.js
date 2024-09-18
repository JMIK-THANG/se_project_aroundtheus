export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  openModal() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._closeEscHandler);
  }
  closeModal() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._closeEscHandler);
  }

  _closeEscHandler = (e) => {
    if (e.key === "Escape") {
      this.closeModal();
    }
  };
  _closeOverlayHandler(e) {
    if (e.target === this._popupElement) {
      this.closeModal();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.closeModal();
    });

    this._popupElement.addEventListener("click", (e) =>
      this._closeOverlayHandler(e)
    );
  }
}
