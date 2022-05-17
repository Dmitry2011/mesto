export class Card {
  constructor ({data, handleCardClick}, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
  }

    //получаем шаблон карточки
  _getTemplate() {
    const cardElement = document
        .querySelector (this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
    return cardElement;
  }

    // создаем карточку
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage =  this._element.querySelector('.element__mask-group');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._like = this._element.querySelector('.element__group');
    this._setEventListeners();
    return this._element;
  }

    // слушаем события по кликам "поставить лайк", "удалить карточку", "открыть попап карточки с картинкой"
  _setEventListeners() {
      //"поставить лайк"
    this._like.addEventListener ('click', () => {
        this._likeCard();
    });
      //"удалить карточку"
    this._element.querySelector('.element__delete').addEventListener ('click', () => {
        this._deleteCard();
    });
      //"открыть попап карточки с картинкой"
    this._cardImage.addEventListener ('click', () => {
        this._handleCardClick(this._name, this._link);
    });
  }
    // функция установки лайк
  _likeCard () {
    this._like.classList.toggle('element__group_type_activ');
  }

    //функция удаления карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
