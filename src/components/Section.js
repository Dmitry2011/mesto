export class Section {
  constructor ({ renderer }, elementsList) {
    this._renderer = renderer;
    this._container = elementsList;
  }

    // метод для отрисовки элементов
  renderItems (items) {
    items.forEach(element => {
      this._renderer(element);
    });
  }

    // метод принимает DOM элемент и добавляет его в контейнер(в начало)
  addItemPrepend(element) {
    this._container.prepend(element);
  }

    // метод принимает DOM элемент и добавляет его в контейнер(в конец)
  addItemAppend(element) {
    this._container.append(element);
  }
}
