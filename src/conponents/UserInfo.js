export default class UserInfo {
  constructor(nameS, jobS, avatarS) {
    this._nameInput = nameS;
    this._jobInput = jobS;
    this._avatarImage = avatarS;
  }

  setUserInfo(data) {
    const { name: nameUser, about: jobUser, _id, avatar } = data;
    this._nameInput.textContent = nameUser;
    this._jobInput.textContent = jobUser;
    this._avatarImage.src = avatar;
    this._id = _id;
    this._avatar = avatar;
  }

  getUserInfo = () => {
    return {
      name: this._nameInput.textContent,
      job: this._jobInput.textContent,
      avatar: this._avatar,
      id: this._id,
    };
  };
}