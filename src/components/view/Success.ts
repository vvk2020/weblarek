import { ISuccess, Price } from "../../types";
import { EVENTS, SELECTORS } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Success extends Component<ISuccess> {
  protected totalEl: HTMLElement; // <span> вывода значения счетчика товаров в корзине
  protected closeBtn: HTMLButtonElement; // <button> закрытия окна

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    // Определение HTML-элементов в контейнере container
    this.totalEl = this.container.querySelector(SELECTORS.success.total) as HTMLElement;
    this.closeBtn = this.container.querySelector(SELECTORS.success.buttonClose) as HTMLButtonElement;
    // События на кнопке закрытия окна
    this.closeBtn.addEventListener('click', () => {
      this.events.emit(EVENTS.success.close);
    });
  }

  /** Вывод в описании списанной стоимости заказа */
  set total(value: Price) {
    if (value) this.totalEl.textContent = 'Списано ' + value.toString() + ' синапсов';
  }

  /** Рендер на основе данных, переданных через data   
   * Если данные не определены, то возврат контейнера */
  public render(data?: Partial<ISuccess>): HTMLElement {
    return (data) ? super.render(data) : this.container;
  }
}
