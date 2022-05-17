import {Popup} from '../components/Popup.js';

export class PopupWithImage  extends Popup {
  constructor (popupSelector) {
    super (popupSelector);
    this._pictureCard =  document.querySelector('.picture__card');
  }

  // метод открытия попап карточки
  openPopup (name, link) {
    this._pictureCard.src = link;
    this._pictureCard.alt = name;
    document.querySelector('.picture__title').textContent = name;
    super.openPopup();
  }
}
