import { IBasketData } from "../../types";
import { EVENTS, SELECTORS } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/** ПРЕДСТАВЛЕНИЕ КОРЗИНЫ КАРТОЧЕК ТОВАРОВ */
export class BasketView extends Component<IBasketData> {
  protected listEl: HTMLUListElement; // <ul> контейнера карточек товара
  protected totalEl: HTMLElement; // <span> стоимости товаров в корзине
  protected orderBtn: HTMLButtonElement; // <button> оформления заказа

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    // Определение HTML-элементов в контейнере container
    this.listEl = this.container.querySelector(SELECTORS.basket.listContainer) as HTMLUListElement;
    this.totalEl = this.container.querySelector(SELECTORS.basket.total) as HTMLElement;
    this.orderBtn = this.container.querySelector(SELECTORS.basket.orderButton) as HTMLButtonElement;
    // Обработчик старта (вызова первой формы) оформления заказа 
    this.orderBtn.addEventListener('click', () => {
      this.events.emit(EVENTS.forms.order.open, this.container); // брокер: генерирование события удаления товара из корзины
    });
  };

  set cards(cards: HTMLElement[]) {
    // Отображение в корзине карточек или стилизованного текста "Корзина пуста"
    if (cards?.length > 0) {
      this.listEl?.replaceChildren(...cards);
      this.listEl.classList.remove('basket__empty-text');
      this.orderBtn.disabled = false; // раззблокировка кнопки оформления заказа

    } else {
      this.listEl.textContent = 'Корзина пуста';
      this.listEl.classList.add('basket__empty-text');
      this.orderBtn.disabled = true; // блокировка кнопки оформления заказа
    }
  }

  /** Рендер корзины товаров */
  public render(data?: IBasketData): HTMLElement {
    // Отображение стоимости товаров в корзине
    if (this.totalEl) {
      this.totalEl.textContent = data?.total ? data?.total.toString() + ' синапсов' : '0 синапсов';
    }
    return super.render(data);
  }
}