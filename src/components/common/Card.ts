import { Price } from "../../types";
import { SELECTORS } from "../../utils/constants";
import { setElementData } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/** АБСТРАКТНАЯ КАРТОЧКА ТОВАРА  
 * Используется для создания специализированных карточек галереи, корзины 
 * и подробного просмотра товаров
 */
export abstract class Card<T> extends Component<T> {
  protected events: IEvents; // брокер событий
  protected titleElement: HTMLElement; // <h2> заголовка товара в корзине
  protected priceElement: HTMLElement; // <span> вывода цены товара

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    // Определение HTML-элементов в контейнере container
    this.titleElement = this.container.querySelector(SELECTORS.card.title) as HTMLElement;
    this.priceElement = this.container.querySelector(SELECTORS.card.price) as HTMLImageElement;
  }

  /** Задание заголовка товара в карточке */
  set title(text: string) {
    this.titleElement.textContent = text;
  }

  /** Задание цены товара в карточке  
   * (если цена не указана, то выводится "Бесценно") */
  set price(value: Price) {
    this.priceElement.textContent = value ? value.toString() + ' синапсов' : 'Бесценно';
  }

  /** Рендер карточки товара на основе данных data   
   * 1. Если данные не определены, то возврат исходного контейнера 
   * 2. Контейнеру присваивается id карточки */
  public render(data?: Partial<T>): HTMLElement {
    if (data) {
      // Присвоение контейнеру уникального идентификатора карточки
      if ('id' in data) setElementData(this.container, { id: data.id });
      return super.render(data);
    }
    return this.container; // возврат исходного контейнера
  }
}
