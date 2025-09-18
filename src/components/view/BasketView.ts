import { IBasketData, Price } from "../../types";
import { SELECTORS } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/** ПРЕДСТАВЛЕНИЕ КОРЗИНЫ КАРТОЧЕК ТОВАРОВ */
export class BasketView extends Component<IBasketData> {
  protected listContainer: HTMLUListElement; // <ul> контейнера карточек товара
  protected totalElement: HTMLElement; // <span> стоимости товаров в корзине
  protected buttonOrderElement: HTMLButtonElement; // <button> оформления заказа

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    // Определение HTML-элементов в контейнере container
    this.listContainer = this.container.querySelector(SELECTORS.basket.listContainer) as HTMLUListElement;
    this.totalElement = this.container.querySelector(SELECTORS.basket.total) as HTMLElement;
    this.buttonOrderElement = this.container.querySelector(SELECTORS.basket.orderButton) as HTMLButtonElement;

    // console.log('this.buttonOrderElement', this.buttonOrderElement);
    // console.log('SELECTORS.basket.container', SELECTORS.basket.container);
  }

  set cards(cards: HTMLElement[]) {
    // Отображение в корзине карточек или стилизованного текста "Корзина пуста"
    if (cards?.length > 0) {
      this.listContainer?.replaceChildren(...cards);
      this.listContainer.classList.remove('basket__empty-text');

    } else {
      this.listContainer.textContent = 'Корзина пуста';
      this.listContainer.classList.add('basket__empty-text');
    }

  }

  /** Рендер корзины товаров */
  public render(data?: IBasketData): HTMLElement {
    // Отображение стоимости товаров в корзине
    if (this.totalElement) {
      this.totalElement.textContent = data?.total ? data?.total.toString() + ' синапсов' : '0 синапсов';
    }

    // Изменение стиля отображения кнопки добавления товара в корзину, если он бесценный или уже в корзине  
    // Object.assign(this.buttonBasketElement,
    //   (!data?.price) ?
    //     { textContent: 'Недоступно', disabled: true } :
    //     { textContent: hasItemInBasket ? 'Удалить из корзины' : 'В корзину', disabled: false }
    // );
    return super.render(data);
  }
}