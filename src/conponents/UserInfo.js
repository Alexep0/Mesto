export default class UserInfo {
  constructor(nameS, jobS, avatarS, data) {
    this._nameInput = nameS;
    this._jobInput = jobS;
    this._avatarImage = avatarS;
    this._avatar = data.avatar;
    this._id = data._id;
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
    console.log(this._id);
    return {
      name: this._nameInput.textContent,
      job: this._jobInput.textContent,
      avatar: this._avatar,
      id: this._id,
    };
  };
}