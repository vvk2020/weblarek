import { IBasketData, Price } from "../../types";
import { SELECTORS } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/** ПРЕДСТАВЛЕНИЕ КОРЗИНЫ КАРТОЧЕК ТОВАРОВ */
export class BasketView extends Component<IBasketData> {
  protected listContainer?: HTMLUListElement; // контейнер списка карточек корзины
  protected totalElement?: HTMLElement; // стоимость товаров в корзине

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    // Определение HTML-элементов в контейнере container
    this.listContainer = this.container.querySelector(SELECTORS.basket.listContainer) as HTMLUListElement;
    this.totalElement = this.container.querySelector(SELECTORS.basket.total) as HTMLElement;
  }

  set cards(cards: HTMLElement[]) {

    // if (cards?.length > 0) {
      this.listContainer?.replaceChildren(...cards);
      // console.log('---cards?.le,ngth', cards?.length);
    // } else {
      // console.log('+++cards?.length', cards?.length);
    // }

    ОТСЮДА
  }

  /** Рендер корзины товаров */
  public render(data?: IBasketData): HTMLElement {
    // Отображение стоимости товаров в корзине
    if (data?.total && this.totalElement) {
      this.totalElement.textContent = data?.total.toString() + ' синапсов';
    }

    console.log('data', data);



    // Изменение стиля отображения кнопки добавления товара в корзину, если он бесценный или уже в корзине  
    // Object.assign(this.buttonBasketElement,
    //   (!data?.price) ?
    //     { textContent: 'Недоступно', disabled: true } :
    //     { textContent: hasItemInBasket ? 'Удалить из корзины' : 'В корзину', disabled: false }
    // );
    return super.render(data);
  }
}