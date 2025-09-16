import { SELECTORS } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/** АБСТРАКТНАЯ ФОРМА  
 * Используется для создания специализированных форм ввода данных покупателя
 * при оформлении заказа */
export class Form<T> extends Component<T> {
  protected errorsElement: HTMLElement; // <span> вывода ошибок формы
  // protected priceElement: HTMLElement; // <span> вывода цены товара

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    // Определение HTML-элементов в контейнере container
    this.errorsElement = this.container.querySelector(SELECTORS.form.errors) as HTMLElement;
    console.log('this.container:', this.container);
    console.log('this.errorsElement:', this.errorsElement);

    // this.priceElement = this.container.querySelector(SELECTORS.card.price) as HTMLImageElement;
  }

  /** Задание заголовка товара в карточке */
  // set title(text: string) {
  //   this.titleElement.textContent = text;
  // }

  /** Задание цены товара в карточке  
   * (если цена не указана, то выводится "Бесценно") */
  // set price(value: Price) {
  //   this.priceElement.textContent = value ? value.toString() + ' синапсов' : 'Бесценно';
  // }

  /** Рендер карточки товара на основе данных data   
   * 1. Если данные не определены, то возврат исходного контейнера 
   * 2. Контейнеру присваивается id карточки */
  // public render(data?: Partial<T>): HTMLElement {
  //   if (data) {
  //     // Присвоение контейнеру уникального идентификатора карточки
  //     if ('id' in data) setElementData(this.container, { id: data.id });
  //     return super.render(data);
  //   }
  //   return this.container; // возврат исходного контейнера
  // }
}
