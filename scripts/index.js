const elementsList = document.querySelector('.elements__list');

const formProfileElement = document.querySelector('form[name="form-profile"]');
const formMestoElement = document.querySelector('form[name="form-mesto"]');
const picture = document.querySelector('.picture');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEddButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupNewLocation = document.querySelector('.popup_type_new-location');
const popupPicture = document.querySelector('.popup_type_picture');
const profileCloseBtn = formProfileElement.querySelector('.popup__close');
const cardCloseBtn = formMestoElement.querySelector('.popup__close');
const pictureCloseBtn = picture.querySelector('.popup__close');

  // инпуты:
const nameInput = formProfileElement.querySelector('.popup__subtitle_type_name');
const professionInput = formProfileElement.querySelector('.popup__subtitle_type_profession');
const mestoInput = formMestoElement.querySelector('.popup__subtitle_type_mesto');
const linkInput = formMestoElement.querySelector('.popup__subtitle_type_link');
const elementMaskGroup = document.querySelector('#element__mask-group');

const profileName = document.querySelector('.profile__title');
const profession = document.querySelector('.profile__subtitle');
const pictureCard = document.querySelector('.picture__card');
const pictureTitle = document.querySelector('.picture__title');

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

  // функция открытия попапов
  function openPopup(popup) {
    popup.classList.add('popup_opened');
}
  // функция закрытия попапов
function сlosePopup (popup) {
  popup.classList.remove('popup_opened');
}
profileCloseBtn.addEventListener ('click', function() {
  сlosePopup(popupProfile);
})
cardCloseBtn.addEventListener ('click', function() {
  сlosePopup(popupNewLocation);
})
pictureCloseBtn.addEventListener ('click', function() {
  сlosePopup(popupPicture);
})
  //открыть попап профиля + прописать текущее значение имени профиля
profileEditButton.addEventListener ('click', function(evt) {
  nameInput.value = profileName.innerText;
  professionInput.value = profession.innerText;
  openPopup(popupProfile);
})
  //открыть попап добавления новой карточки
profileEddButton.addEventListener ('click', function(evt) {
  openPopup(popupNewLocation);
})
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  //возвращаем значения в форму + закрываем попап
  profileName.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  сlosePopup(popupProfile);
}
  //смотрим за событием “submit” + ENTER
formProfileElement.addEventListener('submit', handleProfileFormSubmit);
  // Сгенерировать массив
const createElement = (cardData) => {
    const template =  document.querySelector('#element-item-template');
    const templateElements = template.content.querySelector('.element').cloneNode(true);
    const templateElementsMask = templateElements.querySelector('.element__mask-group');
    templateElements.querySelector('.element__title').textContent = cardData.name;
    templateElementsMask.src = cardData.link;
    templateElementsMask.alt = cardData.name;
      //удаление карточки
    templateElements.querySelector('.element__delete').addEventListener('click', () => {
      templateElements.remove();
    })
      //поставить лайк
    templateElements.querySelector('.element__group').addEventListener('click', (event) => {
      event.target.classList.toggle('element__group_type_activ');
    })
      //открыть попап карточка с картинкой
      templateElementsMask.addEventListener('click',() => {
      pictureCard.src = cardData.link;
      pictureCard.alt = cardData.name;
      pictureTitle.textContent = cardData.name;
      openPopup(popupPicture);
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
  const newCard = {}
  newCard.name = mestoInput.value;
  newCard.link = linkInput.value;
  renderElements(newCard);
  formMestoElement.reset()
  сlosePopup(popupNewLocation);
}
const elements = initialCards.map(cardData => {
  return createElement(cardData);
})
  // добавляем элементы в контейнер ul (куда (в начало), элементы)
elementsList.append(...elements);
  //отслеживаем submit
formMestoElement.addEventListener('submit', addElements);

