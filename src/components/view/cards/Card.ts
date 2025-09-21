import { ICard, Price } from "../../../types";
import { EVENTS, SELECTORS } from "../../../utils/constants";
import { setElementData } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

/** АБСТРАКТНАЯ КАРТОЧКА ТОВАРА  
 * Используется для создания специализированных карточек галереи, корзины 
 * и подробного просмотра товаров
 */
export abstract class Card<T> extends Component<T> implements ICard<T> {
  protected titleEl: HTMLElement; // <h2> заголовка товара в корзине
  protected priceEl: HTMLElement; // <span> вывода цены товара
  // protected buttonDelItemElement?: HTMLButtonElement; // <button> удалеия товара из корзины

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    // Определение HTML-элементов в контейнере container
    this.titleEl = this.container.querySelector(SELECTORS.card.title) as HTMLElement;
    this.priceEl = this.container.querySelector(SELECTORS.card.price) as HTMLImageElement;
    // Обработчик открытия preview карточки
    this.container.addEventListener('click', () => {
      // Preview открывается только при выборе карточек из галереи (не из корзины)
      if (this.container.classList.contains(SELECTORS.gallery.card)) {
        this.events.emit(EVENTS.card.preview, this.container)
      }
    });
    // Обработчик удаления товара из корзины с помощью кнопки 
    if (this.container.classList.contains('basket__item')) {
      const buttonDelItemElement = this.container.querySelector(SELECTORS.basket.delItemButton) as HTMLButtonElement;
      buttonDelItemElement?.addEventListener('click', () => {
        this.events.emit(EVENTS.basket.delItem, this.container); // брокер: генерирование события удаления товара из корзины
      });
    };
  }

  /** Задание заголовка товара в карточке */
  set title(text: string) {
    this.titleEl.textContent = text;
  }

  /** Задание цены товара в карточке  
   * (если цена не указана, то выводится "Бесценно") */
  set price(value: Price) {
    this.priceEl.textContent = value ? value.toString() + ' синапсов' : 'Бесценно';
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
