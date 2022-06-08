export class Popup {
  constructor (popup) {
    this._popup = popup;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleBtnClose = this._handleBtnClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
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
      this.closePopup();
    };
  }

    // метод закрытия попапов по оверлей
  _handleOverlayClose(event) {
    if ( event.target.classList.contains('popup')) {
    this.closePopup();
  }}

    // метод закрытия попапов по оверлей и по крестику
  _handleBtnClose() {
    this.closePopup();
  }

  // метод отслеживания клика по оверлею и крестику
  setEventListeners () {
    this._popup.querySelector('.popup__close').addEventListener('click', this._handleBtnClose);
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
  }
}
