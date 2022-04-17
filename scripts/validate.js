  // функция отображения ошибки
const showInputError = (formElement, inputElement, errorMessage, formElementList) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formElementList.errorTextClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formElementList.inputErrorClass);
};
  // функция скрытия ошибки
const hideInputError = (formElement, inputElement, formElementList) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formElementList.errorTextClass);
  errorElement.classList.remove(formElementList.inputErrorClass);
  errorElement.textContent = " ";
};

  // проверяем валидность значения в поле
const checkInputValidity = (formElement, inputElement, formElementList) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formElementList);
  } else {
    hideInputError(formElement, inputElement, formElementList);
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
const toggleButtonState  = function (inputList, buttonElement, formElementList) {
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonElement, formElementList.inactiveButtonClass);
  } else {
    enableButton(buttonElement, formElementList.inactiveButtonClass);
  }
}

  // слушаем событие по инпуту
const setEventListeners = (formElement, formElementList) => {
  const inputList = Array.from(formElement.querySelectorAll(formElementList.inputSelector));
  const buttonElement = formElement.querySelector(formElementList.submitButtonSelector);
  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, formElementList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formElementList);
      toggleButtonState(inputList, buttonElement, formElementList);
    });
  });
};

const enableValidation = (formElementList) => {
  const formList = Array.from(document.querySelectorAll(formElementList.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  setEventListeners(formElement, formElementList);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error_active',
  errorTextClass: 'popup__subtitle_type_error'
});
