import { IHeaderData as IHeader } from "../../types";
import { EVENTS_NAMES, SELECTORS } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Header extends Component<IHeader> {
  protected events: IEvents; // брокер событий
  protected basketCounterElement: HTMLElement; // <span> вывода значения счетчика товаров в корзине

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;

    // Определение HTML-элементов в контейнере container
    this.basketCounterElement = this.container.querySelector(SELECTORS.header.basketCounter) as HTMLElement; // счетчик товаров в корзине

    // События на кнопке
    this.container.addEventListener('click', () => {
      this.events.emit(EVENTS_NAMES.basket.openModal, this.container); // добавления товара в корзину
    });
  }


  /** Задание значения счетчику товаров корзины */
  set basketCounter(value: number) {
    this.basketCounterElement.textContent = value.toString();
  }

  /** Рендер Header'а на основе данных, переданных через data   
   * Если данные не определены, то возврат контейнера */
  public render(data?: Partial<IHeader>): HTMLElement {
    return (!data) ? this.container : super.render(data);
  }
}
