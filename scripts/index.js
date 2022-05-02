import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {initialCards} from './array.js';

const formProfileElement = document.querySelector('.popup__form-profile');
const formMestoElement = document.querySelector('.popup__form-mesto');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupNewLocation = document.querySelector('.popup_type_new-location');
const nameInput = formProfileElement.querySelector('.popup__subtitle_type_name');
const professionInput = formProfileElement.querySelector('.popup__subtitle_type_profession');
const mestoInput = formMestoElement.querySelector('.popup__subtitle_type_mesto');
const linkInput = formMestoElement.querySelector('.popup__subtitle_type_link');
const profileName = document.querySelector('.profile__title');
const profession = document.querySelector('.profile__subtitle');
const popupsList = Array.from(document.querySelectorAll('.popup'));
const elementsList = document.querySelector('.elements__list');

export const formElementList = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error_active',
  errorTextClass: 'popup__subtitle_type_error'
};

  // функция создания новой карточки
function creatNewCard (data) {
  const card = new Card(data.name, data.link, '#element-item-template');
  const cardElement = card.generateCard();
  return cardElement;
}

  //функция добавления новой карточки (в начало)
const addNewCard = function(items) {
  const cardFromPopup = creatNewCard (items);
  elementsList.prepend(cardFromPopup);
};

  //функция добавления карточек из массива (в конец)
initialCards.forEach((item) => {
  const cardFromArray = creatNewCard(item);
  elementsList.append(cardFromArray);
});

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

  // функция открытия попапов
export function openPopup(popup) {
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
  editProfileValidation.toggleButtonState();
    //скрытm ошибки при повторном открытии попап
  editProfileValidation.hideErrors();
  openPopup(popupProfile);
})

  // прописать введенные значения в форму профиля
function handleProfileFormSubmit (event) {
  event.preventDefault();
    //возвращаем значения в форму + закрываем попап
  profileName.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  сlosePopup(popupProfile);
}

  //открыть попап добавления новой карточки
profileAddButton.addEventListener ('click', function(formElementList) {
    //деактивация кнопки при каждом открытии попап
  addProfileValidation._disabledButton();
    //скрытm ошибки при повторном открытии попап
  addProfileValidation.hideErrors();
  formMestoElement.reset();
  openPopup(popupNewLocation);
})

  // Добавляем новую карточку
const addCard = function (event) {
  event.preventDefault();
  const newCard = {}
  newCard.name = mestoInput.value;
  newCard.link = linkInput.value;
  addNewCard(newCard);
  сlosePopup(popupNewLocation);
};

  //отслеживаем submit попап новой карточки
formMestoElement.addEventListener('submit', addCard);

  //отслеживаем submit попап профиля
formProfileElement.addEventListener('submit', handleProfileFormSubmit);

  // Проверять на валидность инпуты редактирования профиля
const editProfileValidation = new FormValidator (formElementList, formProfileElement);
editProfileValidation.enableValidation();

  // Проверять на валидность инпуты добавления новых карточек
const addProfileValidation = new FormValidator (formElementList, formMestoElement);
addProfileValidation.enableValidation();
