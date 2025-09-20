import { IBasketCardData } from "../../../types";
import { SELECTORS } from "../../../utils/constants";
import { IEvents } from "../../base/Events";
import { Card } from "../../common/Card";

/** КЛАСС КАРТОЧКИ ГАЛЕРЕИ */
export class BasketCard extends Card<IBasketCardData> {
  protected events: IEvents; // брокер событий
  protected IndexElement: HTMLElement; // <span> порядкового номера в списке товаров

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container, events);
    this.events = events;
    // Определение HTML-элементов в контейнере container
    this.IndexElement = this.container.querySelector(SELECTORS.basket.card.index) as HTMLElement;
  }

  /** Рендер карточки товара корзины на основе данных data */
  public render(data?: IBasketCardData, index?: number): HTMLElement {
    // Назначение порядкового номера карточки в корзине
    if (index && this.IndexElement) {
      // console.log('seqNumber', index);
      this.IndexElement.textContent = index.toString();
    }
    return super.render(data);
  }
}
