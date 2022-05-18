import {Popup} from '../components/Popup.js';

export class PopupWithImage  extends Popup {
  constructor (popupSelector) {
    super (popupSelector);
    this._pictureCard =  document.querySelector('.picture__card');
    this._pictureTitle = document.querySelector('.picture__title');
  }

  // метод открытия попап карточки (картинки)
  openPopup (name, link) {
    this._pictureCard.src = link;
    this._pictureCard.alt = name;
    this._pictureTitle.textContent = name;
    super.openPopup();
  }
}
