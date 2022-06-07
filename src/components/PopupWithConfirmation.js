import {Popup} from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popup) {
    super (popup);
    this._form = this._popup.querySelector('.popup__container');
  }

  setSubmitAction(action) {
    this._callbackSubmit = action;
   }

    // слушаем событие на форме подтверждения
  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._callbackSubmit();
    });
  }
}
