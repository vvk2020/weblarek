import { IGalleryCard, IGalleryCardData } from "../../../types";
import { categoryMap, CDN_URL, SELECTORS } from "../../../utils/constants";
import { IEvents } from "../../base/Events";
import { Card } from "../../common/Card";

/** КЛАСС КАРТОЧКИ ГАЛЕРЕИ */
export class GalleryCard extends Card<IGalleryCardData> implements IGalleryCard {
  protected events: IEvents; // брокер событий
  protected categoryElement: HTMLElement; // <span> категории товара
  protected imageElement: HTMLImageElement; // <img> изображения товара

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container, events);
    this.events = events;
    // Определение HTML-элементов в контейнере container
    this.categoryElement = this.container.querySelector(SELECTORS.card.category) as HTMLElement;
    this.imageElement = this.container.querySelector(SELECTORS.card.image) as HTMLImageElement;
  }

  /** Задание категории товара в карточке */
  set category(key: string) {
    if (key in categoryMap) {
      this.categoryElement.textContent = key;
      this.categoryElement.classList.add(categoryMap[key as keyof typeof categoryMap]);
    }
  }

  /** Задание изображения товара в карточке */
  set image(path: string) {
    this.setImage(this.imageElement, CDN_URL + path, "Картинка карточки");
  }
}
