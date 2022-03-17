let profileInfoEditButton = document.querySelector('.profile-info__edit-button');
let popupClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');

profileInfoEditButton.addEventListener ('click', function(evt) {
  popup.classList.add('popup__opened');
  })

popupClose.addEventListener ('click', function() {
  popup.classList.remove('popup__opened');
  })

let formElement = document.querySelector('.popup__container');

  // инпуты:
let nameInput = formElement.querySelector('.popup__name');
let professionInput = formElement.querySelector('.popup__profession');

  //тексты в профиле
let profileName = document.querySelector('.profile-info__title');
let profession = document.querySelector('.profile-info__subtitle');

function formSubmitHandler (evt) {
  evt.preventDefault();
  //возвращаем значения в форму
  profileName.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  popup.classList.remove('popup__opened');
}

  //смотрим за событием “submit” + ENTER
  formElement.addEventListener('submit', formSubmitHandler);
  formElement.addEventListener('e.keyCode == 13', formSubmitHandler);


