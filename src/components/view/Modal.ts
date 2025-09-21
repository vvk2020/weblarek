import { IModal } from "../../types";
import { SELECTORS } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/** КЛАСС МОДАЛЬНОГО ОКНА  
 * Модальное окно предоставляет контейнер для размещения контента */
export class Modal<T> extends Component<T> implements IModal {
  protected closeBtn: HTMLButtonElement; // кнопка ✖ закрытия окна
  protected contentContainer: HTMLElement; // контейнер для размещения контента в окне

  /** Конструктор окна, предоставляет контейнер для размещения контента*/
  constructor(
    container: HTMLElement, // контейнер для размещения окна
    protected events: IEvents, // брокер событий
    protected contentEl: HTMLElement[] = [] // контент, размещаемый в окне
  ) {
    super(container);
    // Определение HTML-элементов в контейнере container
    this.closeBtn = container.querySelector(SELECTORS.modal.closeButton) as HTMLButtonElement; // кнопка закрытия окна ✖
    this.contentContainer = container.querySelector(SELECTORS.modal.contentContainer) as HTMLElement; // контейнер для контента окна
    // Размещение контента в контейнере
    if (contentEl) this.setСontent(contentEl);
    // Навешивание обработчика закрытия окна по кнопке ✖ окна
    this.closeBtn?.addEventListener("click", this.close.bind(this));
    // Навешивание обработчика закрытия окна по click вне окна
    container.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
    // Привязка обработчика закрытия окна к Esc
    this.handleEscUp = this.handleEscUp.bind(this);
  }

  /** Размещение контента в контейнере окна */
  setСontent(elements: HTMLElement[]): void {
    this.contentEl = elements;
    this.contentContainer.replaceChildren(...elements);
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
