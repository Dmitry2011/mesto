import './index.css';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {
  profileEditButton,
  profileAddButton,
  popupPicture,
  initialCards,
  elementsList,
  formElementList,
  profileEdit,
  elementsAdd,
  formProfileElement,
  formMestoElement,
  nameInput,
  professionInput
} from '../utils/constants.js';

  // открыть попап просмотра карточки
const popupImage = new PopupWithImage(popupPicture);
popupImage.setEventListeners();

  // функция создания новой карточки
const createNewCard = function creatNewCard(data) {
  const card = new Card({data,
    handleCardClick: (name, link) => {
      popupImage.openPopup(name, link);
    }
  }, '#element-item-template');
  const cardElement = card.generateCard();
  return cardElement;
}

  //функция добавления новой карточки
const cards = new Section ({
  data: initialCards,
  renderer: (item) => {
    const objectFromArray = createNewCard(item);
    cards.addItem(objectFromArray);
  }
}, elementsList );
cards.renderItems();

  // Добавляем новую карточку
const popupWithFormAdd = new PopupWithForm(
  {callbackSubmit: (data) => {
    const cardFromPopup = createNewCard(data);
    cards.addItem(cardFromPopup);
    popupWithFormAdd.closePopup();
  }
}, elementsAdd);
popupWithFormAdd.setEventListeners();

const createUserInfo = new UserInfo ('.profile__title', '.profile__subtitle');

  //функция открытия попапа редактирования профиля
function editProfile() {
  // подставляем данные из объекта в модальное окно
  const userData = createUserInfo.getUserInfo();
  nameInput.value = userData.name;
  professionInput.value = userData.profession;

  //деактивация кнопки при каждом открытии попап
  editProfileValidation.toggleButtonState();
  //скрыть ошибки при повторном открытии попап
  editProfileValidation.hideErrors();
  popupWithFormEdit.openPopup();
}
  // редактируем профиль
const popupWithFormEdit = new PopupWithForm (
  {callbackSubmit: (data) => {
     createUserInfo.setUserInfo(data);
   popupWithFormEdit.closePopup();
  }}, profileEdit);
popupWithFormEdit.setEventListeners();

  // открыть попап профиля по клику кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  editProfile() ;
});

  // открыть попап добаления карточки по клику кнопки добавления карточки
profileAddButton.addEventListener('click', () => {
  // деактивация кнопки при каждом открытии попап
  addProfileValidation.toggleButtonState();
  // скрыть ошибки при повторном открытии попап
  addProfileValidation.hideErrors();
  popupWithFormAdd.openPopup();
});

  // Проверять на валидность инпуты редактирования профиля
const editProfileValidation = new FormValidator (formElementList, formProfileElement);
editProfileValidation.enableValidation();

  // Проверять на валидность инпуты добавления новых карточек
const addProfileValidation = new FormValidator (formElementList, formMestoElement);
addProfileValidation.enableValidation();
