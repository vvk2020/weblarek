import { IGalleryCard, IGalleryCardData } from "../../../types";
import { categoryMap, CDN_URL, SELECTORS } from "../../../utils/constants";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

/** КЛАСС КАРТОЧКИ ГАЛЕРЕИ */
export class GalleryCard extends Card<IGalleryCardData> implements IGalleryCard {
  protected categoryEl: HTMLElement; // <span> категории товара
  protected imageEl: HTMLImageElement; // <img> изображения товара

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container, events);
    // Определение HTML-элементов в контейнере container
    this.categoryEl = this.container.querySelector(SELECTORS.card.category) as HTMLElement;
    this.imageEl = this.container.querySelector(SELECTORS.card.image) as HTMLImageElement;
  }

  /** Задание категории товара в карточке */
  set category(key: string) {
    if (key in categoryMap) {
      this.categoryEl.textContent = key;
      this.categoryEl.classList.add(categoryMap[key as keyof typeof categoryMap]);
    }
  }

  /** Задание изображения товара в карточке */
  set image(path: string) {
    this.setImage(this.imageEl, CDN_URL + path, "Картинка карточки");
  }
}
