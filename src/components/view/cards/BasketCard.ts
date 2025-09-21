import { IBasketCardData } from "../../../types";
import { SELECTORS } from "../../../utils/constants";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

/** КЛАСС КАРТОЧКИ ГАЛЕРЕИ */
export class BasketCard extends Card<IBasketCardData> {
  protected IndexEl: HTMLElement; // <span> порядкового номера в списке товаров

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container, events);
    // Определение HTML-элементов в контейнере container
    this.IndexEl = this.container.querySelector(SELECTORS.basket.card.index) as HTMLElement;
  }

  /** Рендер карточки товара корзины на основе данных data */
  public render(data?: IBasketCardData, index?: number): HTMLElement {
    // Назначение порядкового номера карточки в корзине
    if (index && this.IndexEl) {
      // console.log('seqNumber', index);
      this.IndexEl.textContent = index.toString();
    }
    return super.render(data);
  }
}
