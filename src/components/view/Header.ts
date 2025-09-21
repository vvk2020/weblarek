import { IHeaderData } from "../../types";
import { EVENTS, SELECTORS } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/** HEADER СТРАНИЦЫ */
export class Header extends Component<IHeaderData> {
  protected basketCounterEl: HTMLElement; // счетчик товаров в корзине

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    this.basketCounterEl = this.container.querySelector(SELECTORS.header.basketCounter) as HTMLElement; // счетчик товаров в корзине
    // Событие на кнопке корзины
    this.container.addEventListener('click', () => {
      this.events.emit(EVENTS.basket.openModal, this.container); // добавления товара в корзину
    });
  }

  /** Задание значения счетчику товаров корзины */
  set basketCounter(value: number) {
    this.basketCounterEl.textContent = value.toString();
  }
}
