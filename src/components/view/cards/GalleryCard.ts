import { IGalleryCard, IGalleryCardData } from "../../../types";
import { categoryMap, CDN_URL, SELECTORS } from "../../../utils/constants";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

/** КАРТОЧКА ГАЛЕРЕИ */
export class GalleryCard extends Card<IGalleryCardData> implements IGalleryCard {
  protected categoryEl: HTMLElement; // категория товара
  protected imageEl: HTMLImageElement; // изображение товара

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container, events);
    this.categoryEl = this.container.querySelector(SELECTORS.card.category) as HTMLElement;
    this.imageEl = this.container.querySelector(SELECTORS.card.image) as HTMLImageElement;
  }

  /** Задание и стилизация категории товара в карточке */
  set category(key: string) {
    if (key in categoryMap) {
      // Удаление ранее заданных классов категорий
      const categoryRegex = /card__category_/;
      const classesToRemove = Array.from(this.categoryEl.classList)
        .filter(className => categoryRegex.test(className));
      this.categoryEl.classList.remove(...classesToRemove);
      // Задание класса категории
      this.categoryEl.textContent = key;
      this.categoryEl.classList.add(categoryMap[key as keyof typeof categoryMap]);
    }
  }

  /** Задание изображения товара в карточке */
  set image(path: string) {
    this.setImage(this.imageEl, CDN_URL + path, "Картинка карточки");
  }
}
