import { IModal } from "../../types";
import { SELECTORS } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/** КЛАСС МОДАЛЬНОГО ОКНА */
export class Modal<T> extends Component<T> implements IModal {
  // protected modal: HTMLElement;
  // protected events: IEvents; // брокер событий
  protected closeButtonElement: HTMLButtonElement; // кнопка ✖ закрытия окна
  protected contentContainer: HTMLElement;
  // protected contentElements: HTMLElement[] = [];

  constructor(
    protected container: HTMLElement,
    protected events: IEvents,
    protected contentElements: HTMLElement[] = []
  ) {
    console.log('container', container);
    console.log('contentElements:', contentElements);
    super(container);
    // this.events = events;

    ОТСЮДА

    // Определение HTML-элементов в контейнере container
    this.closeButtonElement = this.container.querySelector(SELECTORS.modal.closeButton) as HTMLButtonElement; // кнопка закрытия окна ✖
    this.contentContainer = this.container.querySelector(SELECTORS.modal.contentContainer) as HTMLElement; // контейнер для контента окна

    // Навешивание обработчика закрытия окна по кнопке ✖ окна
    this.closeButtonElement?.addEventListener("click", this.close.bind(this));

    // Навешивание обработчика закрытия окна по click вне окна
    this.container.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
    // Привязка обработчика закрытия окна к Esc
    this.handleEscUp = this.handleEscUp.bind(this);
  }

  /** Контент окна */
  set content(elements: HTMLElement[]) {
    this.contentElements = elements;
    this.container.replaceChildren(...elements);
  }

  get content(): HTMLElement[] {
    return this.contentElements;
  }

  /** Открытие модального окна */
  public open(): void {
    this.container.classList.add("modal_active");
    document.addEventListener("keyup", this.handleEscUp);
  }

  /** Закрытие модального окна */
  public close(): void {
    this.container.classList.remove("modal_active");
    document.removeEventListener("keyup", this.handleEscUp);
  }

  /** Обработчик закрытия модального окна по Esc*/
  public handleEscUp(evt: KeyboardEvent): void {
    if (evt.key === "Escape") {
      this.close();
    }
  };
}
