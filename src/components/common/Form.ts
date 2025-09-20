import { SELECTORS } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/** АБСТРАКТНАЯ ФОРМА  
 * Используется для создания специализированных форм ввода данных покупателя
 * при оформлении заказа */
export class Form<T> extends Component<T> {
  protected errorsElement: HTMLElement; // <span> вывода ошибок формы
  protected inputsElements: NodeListOf<HTMLInputElement>; // лист <input>'ов формы

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    // Определение HTML-элементов в контейнере container
    this.errorsElement = this.container.querySelector(SELECTORS.forms.errors) as HTMLElement;
    this.inputsElements = this.container.querySelectorAll(SELECTORS.forms.inputs.selector) as NodeListOf<HTMLInputElement>; // <input>'ы формы
    // console.log('this.errorsElement:', this.errorsElement);
  }

  /** Задание выводимого текста ошибки валидации формы */
  set errors(text: string) {
    this.errorsElement.textContent = text;
  }

  // // Задание полей ввода данных
  // set inputValues(data: Record<string, string>) {
  //   this.inputsElements.forEach((element) => {
  //     element.value = data[element.name];
  //   });
  // }
}
