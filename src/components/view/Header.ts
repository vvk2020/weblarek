import { IHeaderData } from "../../types";
import { EVENTS, SELECTORS } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Header extends Component<IHeaderData> {
  protected basketCounterEl: HTMLElement; // <span> вывода значения счетчика товаров в корзине

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    // Определение HTML-элементов в контейнере container
    this.basketCounterEl = this.container.querySelector(SELECTORS.header.basketCounter) as HTMLElement; // счетчик товаров в корзине
    // События на кнопке
    this.container.addEventListener('click', () => {
      this.events.emit(EVENTS.basket.openModal, this.container); // добавления товара в корзину
    });
  }

  /** Задание значения счетчику товаров корзины */
  set basketCounter(value: number) {
    this.basketCounterEl.textContent = value.toString();
  }

  /** Рендер Header'а на основе данных, переданных через data   
   * Если данные не определены, то возврат контейнера */
  public render(data?: Partial<IHeaderData>): HTMLElement {
    return (!data) ? this.container : super.render(data);
  }
}
