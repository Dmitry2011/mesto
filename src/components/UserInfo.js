export class UserInfo {
  constructor (nameSelector, professionSelector, avatarSelector) {
    this._nameUser = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

    // метод возвращает объет с данными пользователя
  getUserInfo () {
    return  {
    name: this._nameUser.textContent,
    profession: this._profession.textContent,
    }
  }

    // метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo (data) {
    this._nameUser.textContent = data.name;
    this._profession.textContent = data.about;
    this._avatar.src = data.avatar;
    this._id = data._id;
  }

    // метод возвращает ID пользователя
  getUserId() {
    return this._id;
  }
}
