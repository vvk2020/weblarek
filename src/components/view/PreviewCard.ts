import { IPreviewCardData } from "../../types";
import { EVENTS_NAMES, SELECTORS } from "../../utils/constants";
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

    // События на кнопке
    this.container.addEventListener('click', () => {
      this.events.emit(EVENTS_NAMES.basket.addItem, this.container); // добавления товара в корзину
      this.events.emit(EVENTS_NAMES.modal.close); // закрытие модального окна
    });
  }

  /** Рендер карточки товара корзины на основе данных data */
  public render(data?: IPreviewCardData, hasItemInBasket?: boolean): HTMLElement {

    console.log('isAddedToBasket', hasItemInBasket);

    // Изменение стиля отображения кнопки добавления товара в корзину, если он бесценный или уже в корзине  
    Object.assign(this.buttonBasketElement,
      (!data?.price) ?
        { textContent: 'Недоступно', disabled: true } :
        { textContent: hasItemInBasket ? 'Удалить из корзины' : 'В корзину', disabled: false }
    );
    return super.render(data);
  }
}
