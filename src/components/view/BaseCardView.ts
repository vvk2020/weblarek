import { IProduct } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class BaseCardView<T> extends Component<T> {
  protected events: IEvents; // брокер событий
  // protected basketCounterElement: HTMLElement; // <span> вывода значения счетчика товаров в корзине

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;

    // Определение HTML-элементов в контейнере container
    // this.basketCounterElement = this.container.querySelector('.header__basket-counter') as HTMLElement; 
  }


  /** Задание значения счетчику товаров корзины */
  // set basketCounter(value: number) {
  //   this.basketCounterElement.textContent = value.toString();
  // }

  /** Рендер Header'а на основе данных, переданных через data   
   * Если данные не определены, то возврат контейнера */
  public render(data?: Partial<T>): HTMLElement {
    return (!data) ? this.container : super.render(data);
  }
}
