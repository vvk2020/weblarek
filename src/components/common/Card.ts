import { Price } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Card<T> extends Component<T> {
  protected events: IEvents; // брокер событий
  protected categoryElement: HTMLElement; // <span> категории товара
  protected titleElement: HTMLElement; // <h2> заголовка товара в корзине
  protected imageElement: HTMLImageElement; // <img> изображения товара
  protected priceElement: HTMLElement; // <span> вывода цены товара

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;

    // <template id="card-catalog">
    // 	<button class="gallery__item card">
    // 		<span class="card__category card__category_soft">софт-скил</span>
    // 		<h2 class="card__title">+1 час в сутках</h2>
    // 		<img class="card__image" src="<%=require('../images/Subtract.svg')%>" alt="" />
    // 		<span class="card__price">750 синапсов</span>
    // 	</button>
    // </template>

    // Определение HTML-элементов в контейнере container
    this.categoryElement = this.container.querySelector('.card__category') as HTMLElement;
    this.titleElement = this.container.querySelector('.card__title') as HTMLElement;
    this.imageElement = this.container.querySelector('.card__image') as HTMLImageElement;
    this.priceElement = this.container.querySelector('.card__price') as HTMLImageElement;
  }

  /** Задание категории товара в карточке */
  set category(key: string) {
    if (key in categoryMap) {
      this.categoryElement.textContent = key;
      this.categoryElement.classList.add(categoryMap[key as keyof typeof categoryMap]);
    }
  }

  /** Задание заголовка товара в карточке */
  set title(text: string) {
    this.titleElement.textContent = text;
  }

  /** Задание изображения товара в карточке */
  set image(path: string) {
    this.setImage(this.imageElement, CDN_URL + path, "Картинка карточки");
  }

  /** Задание цены товара в карточке  
   * (если цена не указана, то выводится "Бесценно") */
  set price(value: Price) {
    this.priceElement.textContent = value ? value.toString() + ' синапсов' : 'Бесценно';
  }

  /** Рендер Header'а на основе данных, переданных через data   
   * Если данные не определены, то возврат контейнера */
  public render(data?: Partial<T>): HTMLElement {
    return (!data) ? this.container : super.render(data);
  }
}
