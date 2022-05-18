export const initialCards = [
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

export const formProfileElement = document.querySelector('.popup__form-profile');
export const formMestoElement = document.querySelector('.popup__form-mesto');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const nameInput = formProfileElement.querySelector('.popup__subtitle_type_name');
export const professionInput = formProfileElement.querySelector('.popup__subtitle_type_profession');
export const mestoInput = formMestoElement.querySelector('.popup__subtitle_type_mesto');
export const linkInput = formMestoElement.querySelector('.popup__subtitle_type_link');
export const elementsList = document.querySelector('.elements__list');
export const popupPicture = document.querySelector('.popup_type_picture');
export const profileEdit = document.querySelector('.popup_type_profile');
export const elementsAdd = document.querySelector('.popup_type_new-location');

export const formElementList = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error_active',
  errorTextClass: 'popup__subtitle_type_error'
};
