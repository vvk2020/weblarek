import { IOrderForm } from "../../types";
import { SELECTORS } from "../../utils/constants";
import { IEvents } from "../base/Events";
import { Form } from "../common/Form";

/** КЛАСС КАРТОЧКИ ГАЛЕРЕИ */
export class OrderForm extends Form<IOrderForm> {
  protected addressElement: HTMLElement; // <input> адреса доставки
  // protected imageElement: HTMLImageElement; // <img> изображения товара

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container, events);

	// <template id="order">
	// 	<form class="form" name="order">
	// 		<div class="order">
	// 			<div class="order__field">
	// 				<h2 class="modal__title">Способ оплаты</h2>
	// 				<div class="order__buttons">
	// 					<button name="card" type="button" class="button button_alt">Онлайн</button>
	// 					<button name="cash" type="button" class="button button_alt">При получении</button>
	// 				</div>
	// 			</div>
	// 			<label class="order__field">
	// 				<span class="form__label modal__title">Адрес доставки</span>
	// 				<input name="address" class="form__input" type="text" placeholder="Введите адрес" />
	// 			</label>
	// 		</div>
	// 		<div class="modal__actions">
	// 			<button type="submit" disabled class="button order__button">Далее</button>
	// 			<span class="form__errors"></span>
	// 		</div>
	// 	</form>
	// </template>

    // Определение HTML-элементов в контейнере container
    this.addressElement = this.container.querySelector(SELECTORS.forms.inputs.address) as HTMLElement;
    // this.imageElement = this.container.querySelector(SELECTORS.card.image) as HTMLImageElement;
  }

  /** Задание категории товара в карточке */
  // set category(key: string) {
  //   if (key in categoryMap) {
  //     this.categoryElement.textContent = key;
  //     this.categoryElement.classList.add(categoryMap[key as keyof typeof categoryMap]);
  //   }
  // }

  /** Задание изображения товара в карточке */
  // set image(path: string) {
  //   this.setImage(this.imageElement, CDN_URL + path, "Картинка карточки");
  // }
}
