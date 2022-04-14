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

const popupList = Array.from(document.querySelectorAll('.popup'));

  //функции закрытия попапов по оверлей
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', function(event) {
    const popupOpened = document.querySelector('.popup_opened');
    if ((popupOpened.target = true) && (event.target === event.currentTarget))  {
      сlosePopup(popupOpened);
    };
  });
});

  //функции закрытия попапов по Esc
const closeByEsc = (event) => {
  if (event.key === 'Escape') {
  const popupOpened = document.querySelector('.popup_opened');
  сlosePopup (popupOpened);
  }
}

//функции закрытия попапов по крестику
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('.popup') || target.classList.contains('popup__close')) {
      сlosePopup(popup)
    }
  })
})

  // функция открытия попапов
  function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener ('keyup', closeByEsc);
  }

    // функция закрытия попапов
  function сlosePopup (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener ('keyup', closeByEsc);
  }

  //открыть попап профиля + прописать текущее значение имени профиля
profileEditButton.addEventListener ('click', function(evt) {
  nameInput.value = profileName.innerText;
  professionInput.value = profession.innerText;
    //деактивация кнопки при каждом открытии попап
  const popupButtonProfile = popupProfile.querySelector('.popup__button-profile');
  disabledButton(popupButtonProfile, "popup__button_disabled");
  openPopup(popupProfile);
})

  //открыть попап добавления новой карточки
profileEddButton.addEventListener ('click', function(evt) {
  //деактивация кнопки при каждом открытии попап
  const popupButtonNewLocation = popupNewLocation.querySelector('.popup__button-new-location');
  disabledButton(popupButtonNewLocation, "popup__button_disabled");
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
