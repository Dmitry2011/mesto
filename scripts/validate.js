  // функция отображения ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__subtitle_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};
  // функция скрытия ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__subtitle_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

  // проверяем валидность значения в поле
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

  // функция проверки полей формы на валидность
const hasInvalidInput = function (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
  //функция деактивации кнопки
const disabledButton = (buttonElement, disabledButtonClass) => {
  buttonElement.classList.add(disabledButtonClass);
  buttonElement.disabled = true;
}
  //функция активации кнопки
const enableButton = (buttonElement, disabledButtonClass) => {
  buttonElement.classList.remove(disabledButtonClass);
  buttonElement.disabled = false;
}

  // функция деактивации кнопки отправки формы
const toggleButtonState  = function (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonElement, 'popup__button_disabled');
  } else {
    enableButton(buttonElement, 'popup__button_disabled');
  }
}

  // слушаем событие по инпуту
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');
  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

  setEventListeners(formElement);

  });
};

enableValidation();
