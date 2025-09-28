import { IModal, IModalData } from "../../types";
import { SELECTORS } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/** МОДАЛЬНОЕ ОКНО */
export class Modal extends Component<IModalData> implements IModal {
  protected closeBtn: HTMLButtonElement; // кнопка ✖ закрытия окна
  protected contentContainer: HTMLElement; // контейнер для размещения контента в окне

  /** Конструктор окна, предоставляет контейнер для размещения контента*/
  constructor(
    container: HTMLElement, // контейнер для размещения окна
    protected events: IEvents, // брокер событий
    protected contentEl: HTMLElement[] = [] // контент, размещаемый в окне
  ) {
    super(container);
    this.closeBtn = container.querySelector(SELECTORS.modal.closeButton) as HTMLButtonElement; // кнопка закрытия окна ✖
    this.contentContainer = container.querySelector(SELECTORS.modal.contentContainer) as HTMLElement; // контейнер для контента окна
    // Размещение контента в контейнере
    if (contentEl) this.content = contentEl;
    // Навешивание обработчика закрытия окна по кнопке ✖ окна
    this.closeBtn?.addEventListener("click", this.close.bind(this));
    // Навешивание обработчика закрытия окна по click вне окна
    container.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }

  /** Размещение контента в контейнере окна */
  set content(elements: HTMLElement | HTMLElement[]) {
    this.contentEl = Array.isArray(elements) ? elements : [elements];
    this.contentContainer.replaceChildren(...this.contentEl);
  }

  /** Открытие модального окна */
  public open(): void {
    this.container.classList.add("modal_active");
  }

  /** Закрытие модального окна */
  public close(): void {
    this.container.classList.remove("modal_active");
  }
}
