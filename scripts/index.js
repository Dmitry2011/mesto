const elementsList = document.querySelector('.elements__list');

const formProfileElement = document.querySelector('.popup__form-profile');
const formMestoElement = document.querySelector('.popup__form-mesto');
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

const popupsList = Array.from(document.querySelectorAll('.popup'));

const popupButtonProfile = popupProfile.querySelector('.popup__button-profile');
const popupButtonNewLocation = popupNewLocation.querySelector('.popup__button-new-location');

const template = document.querySelector('#element-item-template').content.querySelector('.element');

const formElementList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_disabled',
  inputErrorClass: 'popup__input-error_active',
  errorTextClass: 'popup__subtitle_type_error'
};

  //функции закрытия попапов по оверлей и по крестику
popupsList.forEach((popup) => {
  popup.addEventListener('mousedown', function(event) {
    if ( event.target.classList.contains('popup__close') || (event.target === event.currentTarget))  {
      сlosePopup(popup);
    };
  });
});

  //функции закрытия попапов по Esc
const closeByEsc = (event) => {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    сlosePopup(popupOpened);
  };
};

  // функция скрытия ошибки при повторном открытии попап
function hideErrors(popup) {
  if (popup != popupPicture) {
    const form = popup.querySelector(formElementList.formSelector);
    const inputList = Array.from(form.querySelectorAll(formElementList.inputSelector));
    inputList.forEach((inputElement) => {
      hideInputError(form, inputElement, formElementList);
      inputElement.classList.remove(formElementList.errorTextClass);
    });
  }
}

  // функция открытия попапов
function openPopup(popup) {
  hideErrors(popup);
  popup.classList.add('popup_opened');
  document.addEventListener ('keyup', closeByEsc);
};

  // функция закрытия попапов
function сlosePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener ('keyup', closeByEsc);
};

  //открыть попап профиля + прописать текущее значение имени профиля
profileEditButton.addEventListener ('click', function(formElementList) {
  nameInput.value = profileName.innerText;
  professionInput.value = profession.innerText;
    //деактивация кнопки при каждом открытии попап
  disabledButton(popupButtonProfile, formElementList.inactiveButtonClass);
  openPopup(popupProfile);
})

  //открыть попап добавления новой карточки
profileEddButton.addEventListener ('click', function(formElementList) {
  //деактивация кнопки при каждом открытии попап
  disabledButton(popupButtonNewLocation, formElementList.inactiveButtonClass);
  formMestoElement.reset();
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
    const templateElements = template.cloneNode(true);
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
  сlosePopup(popupNewLocation);
}

const elements = initialCards.map(cardData => {
  return createElement(cardData);
})

  // добавляем элементы в контейнер ul (куда (в начало), элементы)
elementsList.append(...elements);
  //отслеживаем submit
formMestoElement.addEventListener('submit', addElements);
