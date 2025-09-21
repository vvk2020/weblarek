import { ISuccess, Price } from "../../types";
import { EVENTS, SELECTORS } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/** СООБЩЕНИЕ ОБ УСПЕШНОМ ОФОРМЛЕНИИ ЗАКАЗА */
export class Success extends Component<ISuccess> {
  protected totalEl: HTMLElement; // стоимость заказа
  protected closeBtn: HTMLButtonElement; // кнопка закрытия окна

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
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
}
