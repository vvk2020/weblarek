import { ICard, Price } from "../../../types";
import { EVENTS, SELECTORS } from "../../../utils/constants";
import { setElementData } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

/** АБСТРАКТНАЯ КАРТОЧКА ТОВАРА */
export abstract class Card<T> extends Component<T> implements ICard<T> {
  protected titleEl: HTMLElement; // название товара
  protected priceEl: HTMLElement; // цена товара

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    this.titleEl = this.container.querySelector(SELECTORS.card.title) as HTMLElement;
    this.priceEl = this.container.querySelector(SELECTORS.card.price) as HTMLImageElement;
  }

  /** Задание названия товара в карточке */
  set title(text: string) {
    this.titleEl.textContent = text;
  }

  /** Задание цены товара в карточке  
   * (если цена не указана, то выводится "Бесценно") */
  set price(value: Price) {
    this.priceEl.textContent = value ? value.toString() + ' синапсов' : 'Бесценно';
  }

  /** Задание порядкового номера товара в корзине */
  set id(value: string) {
    setElementData(this.container, { id: value });
  }

}
