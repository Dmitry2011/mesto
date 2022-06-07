export class Popup {
  constructor (popup) {
    this._popup = popup;
  }

  // метод открытия попапов
  openPopup () {
    this._popup.classList.add('popup_opened');
    document.addEventListener ('keyup', this._handleEscClose);
  }

  // метод закрытия попапов
  closePopup () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener ('keyup', this._handleEscClose);
  }

  // метод закрытия попапов по Esc
  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      this.closePopup();
    };
  }

  // метод закрытия попапов по оверлей и по крестику
  setEventListeners () {
    const popupsList = Array.from(document.querySelectorAll('.popup'));
    popupsList.forEach((popup) => {
      popup.addEventListener('mousedown', (event) => {
        if ( event.target.classList.contains('popup__close') || (event.target === event.currentTarget))  {
          this.closePopup()
        };
      });
    });
  }
}
