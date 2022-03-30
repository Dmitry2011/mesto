const elementsList = document.querySelector('.elements__list');

const formProfileElement = document.querySelector('form[name="form-profile"]');
const formMestoElement = document.querySelector('form[name="form-mesto"]');
const picture = document.querySelector('.picture');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEddButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupNewLocation = document.querySelector('.popup_type_new-location');
const popupPicture = document.querySelector('.popup_type_picture');
const popupOneClose = formProfileElement.querySelector('.popup__close');
const popupTwoClose = formMestoElement.querySelector('.popup__close');
const popupThreeClose = picture.querySelector('.popup__close');

  // инпуты:
const nameInput = formProfileElement.querySelector('.popup__subtitle_type_name');
const professionInput = formProfileElement.querySelector('.popup__subtitle_type_profession');
const mestoInput = formMestoElement.querySelector('.popup__subtitle_type_mesto');
const linkInput = formMestoElement.querySelector('.popup__subtitle_type_link');
const elementMaskGroup = document.querySelector('#element__mask-group');

  //тексты профиля в попапе
const profileName = document.querySelector('.profile__title');
const profession = document.querySelector('.profile__subtitle');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
  //открыть попап профиля + прописать текущее значение имени профиля
profileEditButton.addEventListener ('click', function(evt) {
  nameInput.value = profileName.innerText;
  professionInput.value = profession.innerText;
  popupProfile.classList.add('popup_opened');
})
  //открыть попап добавления новой карточки
profileEddButton.addEventListener ('click', function(evt) {
  popupNewLocation.classList.add('popup_opened');
})
  // закрыть попап
function popupCloses (evt) {
  popupProfile.classList.remove('popup_opened');
  popupNewLocation.classList.remove('popup_opened');
  popupPicture.classList.remove('popup_opened');
}
popupOneClose.addEventListener ('click', function() {
  popupCloses();
})
popupTwoClose.addEventListener ('click', function() {
  popupCloses();
})
popupThreeClose.addEventListener ('click', function() {
  popupCloses();
})
function formProfileElementSubmitHandler (evt) {
  evt.preventDefault();
  //возвращаем значения в форму + закрываем попап
  profileName.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  popupCloses();
}
  //смотрим за событием “submit” + ENTER
formProfileElement.addEventListener('submit', formProfileElementSubmitHandler);
  // Сгенерировать массив
const createElement = (cardData) => {
    const template =  document.querySelector('#element-item-template');
    const templateElements = template.content.querySelector('.element').cloneNode(true);
    const pictureCard = document.querySelector('.picture__card');
    const pictureTitle = document.querySelector('.picture__title');
    templateElements.querySelector('.element__title').textContent = cardData.name;
    templateElements.querySelector('.element__mask-group').src = cardData.link;
    templateElements.querySelector('.element__mask-group').alt = cardData.name;
      //удаление карточки
    templateElements.querySelector('.element__delete').addEventListener('click', () => {
      templateElements.remove();
    })
      //поставить лайк
    templateElements.querySelector('.element__group').addEventListener('click', () => {
      event.target.classList.toggle('element__group_type_activ');
    })
      //открыть попап карточка с картинкой
      templateElements.querySelector('.element__mask-group').addEventListener('click',() => {
      pictureCard.src = cardData.link;
      pictureCard.alt = cardData.name;
      pictureTitle.textContent = cardData.name;
      templateElements.addEventListener ('click', function(evt) {
      popupPicture.classList.add('popup_opened');
      })
    })
    return templateElements;
  }
const renderElements = (cardData) => {
  elementsList.prepend(createElement(cardData));
}
  //навешиваем обработчик по submit
const addElements = (event) => {
  //убираем событие по умолчанию (чтобы страница не перезагружалась)
  event.preventDefault();
  initialCards.name = mestoInput.value;
  initialCards.link = linkInput.value;
  renderElements(initialCards);
  mestoInput.value = '';
  linkInput.value = '';
  popupCloses();
}
const elements = initialCards.map(cardData => {
  return createElement(cardData);
})
  // добавляем элементы в контейнер ul (куда (в начало), элементы)
elementsList.append(...elements);
  //отслеживаем submit
formMestoElement.addEventListener('submit', addElements);

