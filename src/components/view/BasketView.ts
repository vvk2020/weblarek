import { IBasketData, Price } from "../../types";
import { EVENTS, SELECTORS } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/** КОРЗИНА КАРТОЧЕК ТОВАРОВ */
export class BasketView extends Component<IBasketData> {
  protected listEl: HTMLUListElement; // контейнер карточек товара
  protected totalEl: HTMLElement; // стоимость товаров в корзине
  protected orderBtn: HTMLButtonElement; // кнопка оформления заказа

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    // Определение HTML-элементов в контейнере container
    this.listEl = this.container.querySelector(SELECTORS.basket.listContainer) as HTMLUListElement;
    this.totalEl = this.container.querySelector(SELECTORS.basket.total) as HTMLElement;
    this.orderBtn = this.container.querySelector(SELECTORS.basket.orderButton) as HTMLButtonElement;
    // Обработчик старта (вызова первой формы) оформления заказа 
    this.orderBtn.addEventListener('click', () => {
      this.events.emit(EVENTS.forms.order.open, this.container);
    });
  };

  set cards(cards: HTMLElement[]) {
    // Отображение в корзине карточек или стилизованного текста "Корзина пуста"
    if (cards?.length > 0) {
      this.listEl?.replaceChildren(...cards);
    } else {
      this.listEl.textContent = 'Корзина пуста';
    }
    this.refreshState(); // стилизация корзины в зависимости от кол-ва товаров в ней
  }

  set total(value: Price) {
    if (this.totalEl) {
      this.totalEl.textContent = value ? value.toString() + ' синапсов' : '0 синапсов';
    }
  }

  /** Стилизация корзины в зависимости от кол-ва товаров в ней */
  private refreshState(): void {
    // Лист карточек в корзине
    const cardsList = this.listEl.querySelectorAll(SELECTORS.basket.card.selector) as NodeList;
    // Стилизация корзины (отображение "Корзина пуста") и кнопки оформления
    if (cardsList.length > 0) {
      this.listEl.classList.remove('basket__empty-text');
      this.orderBtn.disabled = false; // раззблокировка кнопки оформления заказа
    } else {
      this.listEl.classList.add('basket__empty-text');
      this.orderBtn.disabled = true; // блокировка кнопки оформления заказа
    }
  }

  render(data?: Partial<IBasketData> | undefined): HTMLElement {
    this.refreshState(); // cтилизация корзины в зависимости от кол-ва товаров в ней
    return super.render(data);
  }
}