export class Card {
  constructor ({data, userId, handleCardClick, handleDeleteClick, likeAdd}, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes.length;
      this._userId = userId;
      this._id = data._id;
      this._owner = data.owner._id;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
      this._likeAdd = likeAdd;
  }

    // метод получения шаблона карточки
  _getTemplate() {
    const cardElement = document
        .querySelector (this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
    return cardElement;
  }

    // метод получения ID в карточке
  getId() {
    return this._id;
  }

    // метод создания карточки
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage =  this._element.querySelector('.element__mask-group');
    this._likesCounter = this._element.querySelector('.element__likes-counter');
    this._like = this._element.querySelector('.element__group');
    this._elementDelete = this._element.querySelector('.element__delete');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._likesCounter.textContent = this._likes;
    this._setEventListeners();
    this._checkWhoseDelete();
    return this._element;
  }

    // метод проверки принадлежности карточки, убираем кнопку удаления у чужой
  _checkWhoseDelete() {
    if(this._owner !== this._userId) {
      this._elementDelete.remove();
    }
  }

    // метод проверки состояния "лайка"
  _checkLikeState() {
    return this._like.classList.contains('element__group_type_activ');
  }

    // слушаем события по кликам "поставить лайк", "удалить карточку", "открыть попап карточки с картинкой"
  _setEventListeners() {

      // метод установки "лайк"
    this._like.addEventListener ('click', () => {
        this._handleLikeClick();
    });

      // метод "удаления карточки"
      this._elementDelete.addEventListener ('click', () => {
        this._handleDeleteClick();
    });

      // метод "открытия попап карточки с картинкой"
    this._cardImage.addEventListener ('click', () => {
        this._handleCardClick();
    });
  }

    // метод установки лайк
  _handleLikeClick() {
    this._likeAdd(this._checkLikeState());
  }

    // метод отображения "лайк" активным + дабавляем 1 к счетчику лайков
  addLike() {
    this._like.classList.add('element__group_type_activ');
    this._likesCounter.textContent = ++this._likes;
  }

    // метод отображения "лайк" не активным + отнимаем 1 от счетчика лайков
  removeLike() {
    this._like.classList.remove('element__group_type_activ');
    this._likesCounter.textContent = --this._likes;
  }

    // метод удаления карточки
  deletCard() {
    this._element.remove();
    this._element = null;
  }
}
