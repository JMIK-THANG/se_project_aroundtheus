export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector,profilePictureSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
    this._profilePicture = document.querySelector(profilePictureSelector); 
  }

  // use when you need the text content of profile elements
  // -> when you open profile form
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  // use when submit form
  // pass the form values as args
  setUserInfo(name, description) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
  }

  setUserPicture(picture){ 
    this._profilePicture.src = picture; 
  }
}


