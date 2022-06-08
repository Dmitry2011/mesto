import './index.css';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {
  profileEditButton,
  profileAddButton,
  editAvatarButton,
  popupPicture,
  popupDelete,
  elementsList,
  formElementList,
  profileEdit,
  elementsAdd,
  formProfileElement,
  formMestoElement,
  formAvatarElement,
  nameInput,
  professionInput,
  avatarEdit,
  profileAvatar
} from '../utils/constants.js';

  // добавляем данные пользователя в модальное окно
function addInfoUserPopup(data) {
  nameInput.value = data.name;
  professionInput.value = data.profession;
}

  // слушаем события в форме подтверждения удаления
const popupConfirmation = new PopupWithConfirmation(popupDelete);
popupConfirmation.setEventListeners();

  // создаем экземпляр класса с нужными селекторами
const createUserInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar"
);

  // слушаем события в форме просмотра карточки
const popupImage = new PopupWithImage(popupPicture);
popupImage.setEventListeners();

  // функция создания новой карточки
const createNewCard = (data) => {
  const card = new Card({
      data: data,
      userId: createUserInfo.getUserId(),
      handleCardClick: () => {
        popupImage.openPopup(data);
      },
      handleDeleteClick: () => {
        popupConfirmation.openPopup();
        popupConfirmation.setSubmitAction(() => {
          api
            .deleteCard(card.getId())
            .then(() => {
              card.deletCard();
              popupConfirmation.closePopup();
            })
            .catch(() => alert(`${error} при удалении карточки`));
        });
      },
      likeAdd: (isLike) => {
        if (isLike) {
          api
            .deleteLike(card.getId())
            .then(card.removeLike())
            .catch(() => alert(`${error} при удалении лайка`)
            );
        } else {
          api
            .addLike(card.getId())
            .then(() => {
              card.addLike();
          })
            .catch(() => alert(`${error} при установке лайка`));
        }
      },
    }, '#element-item-template');
  return card.generateCard();
};

  // функция добавления новой карточки
const cardList = new Section({
    renderer: (data) => {
      cardList.addItemAppend(createNewCard(data));

    },
}, elementsList);

  // создаем экземпляр класса с нужным конфиг
const api = new Api({
  Url: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "4ba7d259-729a-410a-84af-52740cfb006a",
    "Content-Type": "application/json",
  },
});

  // отрисовываем данные пользователя и карточек с сервера
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userDataResult, initialCardsResult]) => {
    createUserInfo.setUserInfo(userDataResult);
    cardList.renderItems(initialCardsResult);
  })
  .catch(() => alert(`${error} загрузке данных пользователя с сервера`));

  // функция отправки на сервер данных пользователя
const popupWithFormEdit = new PopupWithForm({
  popup: profileEdit,
  callbackSubmit: (inputValues) => {
    popupWithFormEdit.loadingData(true);
    api
      .updateUserData(inputValues)
      .then((result) => {
        createUserInfo.setUserInfo(result);
        popupWithFormEdit.closePopup();
      })
      .catch(() => alert(`${error} при отправке информации о пользователе на сервер`))
      .finally(() => {
        popupWithFormEdit.loadingData(false);
      });
  },
});
popupWithFormEdit.setEventListeners();

  // функция открытия попап редактирования данных пользователя
function editProfile() {
  addInfoUserPopup(createUserInfo.getUserInfo());  // подставляем данные в инпуты
  popupWithFormEdit.openPopup();                   // открываем попап
  editProfileValidation.hideErrors();              // скрываем ошибки валидации при повторном открытии
  editProfileValidation.toggleButtonState();       // делаем кнопку отправки формы не активной
}

  // слушаем событие по кнопке редактирования профиля
profileEditButton.addEventListener("click", editProfile);

  // функция отправки данных новой карточки на сервер
const popupWithFormAdd = new PopupWithForm({
  popup: elementsAdd,
  callbackSubmit: (data) => {
    popupWithFormAdd.loadingData(true);
    api
      .addNewCard(data)
      .then((result) => {
        cardList.addItemPrepend(createNewCard(result));
        popupWithFormAdd.closePopup();
      })
      .catch(() => alert(`${error} при создании карточки`))
      .finally(() => {
        popupWithFormAdd.loadingData(false);
      });
  },
});
popupWithFormAdd.setEventListeners();

  // функция открытия попап добавления новой карточки
function eddProfile() {
  popupWithFormAdd.openPopup();                         // открываем попап
  addProfileValidation.hideErrors();                    // скрываем ошибки валидации при повторном открытии
  addProfileValidation.toggleButtonState();             // делаем кнопку отправки формы не активной
}

  // слушаем событие по кнопке добавления карточки
profileAddButton.addEventListener("click", eddProfile);

  // функция отправки новой аватар на сервер
const editAvatarPopup = new PopupWithForm({
  popup: avatarEdit,
  callbackSubmit: (data) => {
    editAvatarPopup.loadingData(true);
    api
      .updateAvatar(data)
      .then((result) => {
        profileAvatar.src = result.avatar;
        editAvatarPopup.closePopup();
      })
      .catch(() => alert(`${error} при отправке аватара пользователя на сервер`))
      .finally(() => {
        editAvatarPopup.loadingData(false);
      });
  },
});
editAvatarPopup.setEventListeners();

  // функция открытия попап редактирования аватар
function editAvatar() {
  editAvatarPopup.openPopup();                      // открываем попап
  avatarProfileValidation.hideErrors();             // скрываем ошибки валидации при повторном открытии
  avatarProfileValidation.toggleButtonState();      // делаем кнопку отправки формы не активной
}

  // слушаем событие по кнопке редактирования аватар
editAvatarButton.addEventListener("click", editAvatar);


  // Проверяем на валидность инпуты попап редактирования профиля
const editProfileValidation = new FormValidator (formElementList, formProfileElement);
editProfileValidation.enableValidation();

  // Проверяем на валидность инпуты попап добавления новых карточек
const addProfileValidation = new FormValidator (formElementList, formMestoElement);
addProfileValidation.enableValidation();

  // Проверяем на валидность инпут попап изменения аватар
const avatarProfileValidation = new FormValidator (formElementList, formAvatarElement);
avatarProfileValidation.enableValidation();
