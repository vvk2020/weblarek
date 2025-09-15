import { IPreviewCardData } from "../../types";
import { SELECTORS } from "../../utils/constants";
import { IEvents } from "../base/Events";
import { GalleryCard } from "./GalleryCard";

/** КЛАСС КАРТОЧКИ В ПОДРОБНОМ ОТОБРАЖЕНИИ */
export class PreviewCard extends GalleryCard {
  protected events: IEvents; // брокер событий
  protected descriptionElement: HTMLElement; // <p описания товара
  protected buttonBasketElement: HTMLButtonElement; // <button> кнопка добавления/удаления товара из корзины

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container, events);
    this.events = events;
    // Определение HTML-элементов в контейнере container
    this.descriptionElement = this.container.querySelector(SELECTORS.card.description) as HTMLElement;
    this.buttonBasketElement = this.container.querySelector(SELECTORS.preview.buttonBasket) as HTMLButtonElement;
  }

  /** Рендер карточки товара корзины на основе данных data */
  public render(data?: IPreviewCardData): HTMLElement {
    // Изменение стиля отображения кнопки добавления в корзину, если товар бесценный
    if (!data?.price) {
      Object.assign(this.buttonBasketElement, {
        textContent: 'Недоступно',
        disabled: true
      });
    }
    return super.render(data);
  }
}
