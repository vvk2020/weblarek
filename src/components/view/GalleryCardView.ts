import { IGalleryCardData } from "../../types";
import { categoryMap } from "../../utils/constants";
import { IEvents } from "../base/Events";
import { Card } from "../common/Card";

export class GalleryCardView extends Card<IGalleryCardData> {
  protected events: IEvents; // брокер событий
  // protected categoryElement: HTMLElement; // <span> вывода значения счетчика товаров в корзине

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container, events);
    this.events = events;

    // Определение HTML-элементов в контейнере container
    // console.log('container:', this.container);
    // this.categoryElement = this.container.querySelector('.card__category') as HTMLElement;
    // console.log('categoryElement:', this.categoryElement);


    // <template id="card-catalog">
    // 	<button class="gallery__item card">
    // 		<span class="card__category card__category_soft">софт-скил</span>
    // 		<h2 class="card__title">+1 час в сутках</h2>
    // 		<img class="card__image" src="<%=require('../images/Subtract.svg')%>" alt="" />
    // 		<span class="card__price">750 синапсов</span>
    // 	</button>
    // </template>



  }


  // /** Задание категории товара в карточке */
  // set category(key: string) {
  //   if (key in categoryMap) {
  //     this.categoryElement.textContent = categoryMap[key as keyof typeof categoryMap];
  //     console.log('categoryElement.textContent:', this.categoryElement.textContent);
  //   }
  // }

  /** Рендер Header'а на основе данных, переданных через data   
   * Если данные не определены, то возврат контейнера */
  public render(data?: IGalleryCardData): HTMLElement {
    return (!data) ? this.container : super.render(data);
  }
}
