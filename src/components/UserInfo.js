import {nameInput, professionInput} from "../utils/constants.js";

export class UserInfo {
  constructor ({profileName, profession}) {
    this._profileName = profileName;
    this._profession = profession;
  }

  // метод возвращает объет с данными пользователя
  getUserInfo () {
    nameInput.value = this._profileName.textContent;
    professionInput.value = this._profession.textContent;
  }

  // метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo () {
    this._profileName.textContent = nameInput.value;
    this._profession.textContent = professionInput.value;
  }
}
