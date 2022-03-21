let profileEditButton = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');

let formElement = document.querySelector('form');

  // инпуты:
let nameInput = formElement.querySelector('.popup__subtitle_type_name');
let professionInput = formElement.querySelector('.popup__subtitle_type_profession');

  //тексты в профиле
  let profileName = document.querySelector('.profile__title');
  let profession = document.querySelector('.profile__subtitle');


  //открыть попап + прописать текущее значение имени профиля
profileEditButton.addEventListener ('click', function(evt) {
  nameInput.value = profileName.innerText;
  professionInput.value = profession.innerText;
  popup.classList.add('popup_opened');
  })

  function popupCloses (evt) {
    popup.classList.remove('popup_opened');
  }
  // закрыть попап
popupClose.addEventListener ('click', function() {
  popupCloses();
  })

function formSubmitHandler (evt) {
  evt.preventDefault();
  //возвращаем значения в форму + закрываем попап
  profileName.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  popupCloses();
}

  //смотрим за событием “submit” + ENTER
  formElement.addEventListener('submit', formSubmitHandler);



