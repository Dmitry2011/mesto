import {Popup} from '../components/Popup.js';

export class PopupWithImage  extends Popup {
  constructor (popup) {
    super (popup);
    this._pictureCard =  document.querySelector('.picture__card');
    this._pictureTitle = document.querySelector('.picture__title');
  }

  // метод открытия попап карточки (картинки)
  openPopup (data) {
    super.openPopup();
    this._pictureCard.src = data.link;
    this._pictureCard.alt = data.name;
    this._pictureTitle.textContent = data.name;
  }
}
