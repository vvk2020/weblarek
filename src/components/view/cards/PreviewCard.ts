import { IPreviewCardData } from "../../../types";
import { EVENTS, SELECTORS } from "../../../utils/constants";
import { IEvents } from "../../base/Events";
import { GalleryCard } from "./GalleryCard";

/** КЛАСС КАРТОЧКИ В ПОДРОБНОМ ОТОБРАЖЕНИИ */
export class PreviewCard extends GalleryCard {
  protected descriptionEl: HTMLElement; // <p описания товара
  protected basketBtn: HTMLButtonElement; // <button> кнопка добавления/удаления товара из корзины

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container, events);
    // Определение HTML-элементов в контейнере container
    this.descriptionEl = this.container.querySelector(SELECTORS.card.description) as HTMLElement;
    this.basketBtn = this.container.querySelector(SELECTORS.preview.buttonBasket) as HTMLButtonElement;
    // События на кнопке
    this.container.addEventListener('click', () => {
      this.events.emit(EVENTS.basket.addItem, this.container); // добавления товара в корзину
      this.events.emit(EVENTS.modal.close); // закрытие модального окна
    });
  }

  /** Рендер карточки товара корзины на основе данных data */
  public render(data?: IPreviewCardData, hasItemInBasket?: boolean): HTMLElement {
    // Изменение стиля отображения кнопки добавления товара в корзину, если он бесценный или уже в корзине  
    Object.assign(this.basketBtn,
      (!data?.price) ?
        { textContent: 'Недоступно', disabled: true } :
        { textContent: hasItemInBasket ? 'Удалить из корзины' : 'В корзину', disabled: false }
    );
    return super.render(data);
  }
}
