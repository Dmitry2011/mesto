import {Popup} from '../components/Popup.js';

export class PopupWithForm  extends Popup {
  constructor ({popup, callbackSubmit}) {
    super(popup);
    this._callbackSubmit = callbackSubmit;
    this._forma = this._popup.querySelector('.popup__form');
    this._inputList = this._forma.querySelectorAll('.popup__input');
    this._buttonSubmit = this._forma.querySelector('.popup__button');
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

   // метод очищает форму при закрытии попап
  closePopup() {
    super.closePopup();
    this._forma.reset();
  }

    // метод отбражения загрузки данных на сервер
  loadingData(isLoading) {
    if(isLoading) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = 'Сохранить';
    }
  }
}
