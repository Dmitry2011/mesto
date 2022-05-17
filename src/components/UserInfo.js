import {nameInput, professionInput} from "../utils/constants.js";

export class UserInfo {
  constructor (nameSelector, professionSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._professionSelector = document.querySelector(professionSelector);
  }

  // метод возвращает объет с данными пользователя
  getUserInfo () {
    return  {
    name: this._nameSelector.textContent,
    profession: this._professionSelector.textContent
    }
  }

  // метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo () {
    this._nameSelector.textContent = nameInput.value;
    this._professionSelector.textContent = professionInput.value;
  }
}
