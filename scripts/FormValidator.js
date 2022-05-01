export class FormValidator {
  constructor (obj, form) {
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorTextClass = obj.errorTextClass;
    this._form = form;
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

    // функция отображения ошибки
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._errorTextClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorClass);
  }

    // функция скрытия ошибки
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._errorTextClass);
    errorElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = " ";
  }

  // функция скрытия ошибки при повторном открытии попап
  hideErrors = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.classList.remove(this._errorTextClass);
    });
  }

    // функция проверки полей формы на валидность
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

    // проверяем валидность значения в поле
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

    //функция деактивации кнопки
  _disabledButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  //функция активации кнопки
  _enableButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

    // функция деактивации кнопки отправки формы
  toggleButtonState  = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._disabledButton(this._buttonElement);
    } else {
      this._enableButton(this._buttonElement);
    }
  }

    // слушаем событие по инпуту (валидность при вводе)
  _setEventListeners = () => {
      // чтобы проверить состояние кнопки в самом начале
    this.toggleButtonState ();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState(this._inputList);
      });
    });
  }

  enableValidation = () => {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  }
}
