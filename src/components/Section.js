export class Section {
  constructor ({data, renderer }, elementsList) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = elementsList;
  }

    // метод для отрисовки элементов
  renderItems () {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

    // метод принимает DOM элемент и добавляет его в контейнер(в начало)
  addItem(element) {
    this._container.prepend(element);
  }
}
