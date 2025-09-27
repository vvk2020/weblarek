import { IBasketCard, IBasketCardData } from "../../../types";
import { EVENTS, SELECTORS } from "../../../utils/constants";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

/** КАРТОЧКА КОРЗИНЫ */
export class BasketCard extends Card<IBasketCardData> implements IBasketCard {
  protected IndexEl: HTMLElement; // порядковый номер товара в корзине

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container, events);
    this.IndexEl = this.container.querySelector(SELECTORS.basket.card.index) as HTMLElement;
    // Обработчик удаления товара из корзины с помощью кнопки 
    const buttonDelItemElement = this.container.querySelector(SELECTORS.basket.delItemButton) as HTMLButtonElement;
    buttonDelItemElement?.addEventListener('click', () => {
      this.events.emit(EVENTS.basket.delItem, this.container); // брокер: генерирование события удаления товара из корзины
    });
  }

  /** Рендер карточки товара корзины на основе данных data */
  public render(data?: IBasketCardData, index?: number): HTMLElement {
    // Назначение порядкового номера карточки в корзине
    if (index && this.IndexEl) {
      this.IndexEl.textContent = index.toString();
    }
    return super.render(data);
  }
}
