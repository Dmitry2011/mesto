import {Popup} from '../components/Popup.js';

export class PopupWithForm  extends Popup {
  constructor ({callbackSubmit}, popup) {
    super(popup);
    this._callbackSubmit = callbackSubmit;
    this._forma = this._popup.querySelector('.popup__form');
    this._inputList = this._forma.querySelectorAll('.popup__input');
  }

   // метод собирает данные всех полей форм
  _getInputValues () {
    this._formValues = {};
    this._inputList.forEach (input => {
      this._formValues[input.name] = input.value;
      });
    return this._formValues;
  }

   // метод отслеживает сабмит формы
  setEventListeners = () => {
    super.setEventListeners();
    this._forma.addEventListener('submit', () => {
      this._callbackSubmit(this._getInputValues());
    });
  }

   // метод очищает форму при закрытии
  closePopup() {
    super.closePopup();
    this._forma.reset();
  }
}
