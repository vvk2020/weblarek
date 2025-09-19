import { IOrderForm } from "../../types";
import { EVENTS_NAMES, SELECTORS } from "../../utils/constants";
import { IEvents } from "../base/Events";
import { Form } from "../common/Form";

/** КЛАСС КАРТОЧКИ ГАЛЕРЕИ */
export class OrderForm extends Form<IOrderForm> {
	protected paymentButtonsList: HTMLButtonElement[]; // массив radio-<button> выбора способа оплаты
	protected selectedPaymentButton?: HTMLButtonElement; // выбранная <button> (способ оплаты)
	protected nextButton: HTMLButtonElement; // <button> перехода к следующей форме
	protected addressInput: HTMLInputElement; // <input> адреса



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
		this.nextButton = container.querySelector(`.order__button`) as HTMLButtonElement;
		this.addressInput = container.querySelector(`input[name="address"]`) as HTMLInputElement;

		// console.log('this.addressInput', this.addressInput);	

		const paymentGroupContaner = container.querySelector(`.order__buttons`) as HTMLElement; // контейнер для radioButtons
		this.paymentButtonsList = Array.from(paymentGroupContaner.querySelectorAll('button.button_alt'));

		// Обработчики
		this.paymentButtonsList.forEach(button => {
			button.addEventListener('click', this.handlePaymentButtonClick);
		}); // кнопки задания способа оплаты

		this.addressInput.addEventListener('input', () => {
			console.log('this.addressInput.addEventListener()');
		});
	}

	/** Обработчик click по кнопке способа оплаты */
	private handlePaymentButtonClick = (event: Event) => {
		const button = event.currentTarget as HTMLButtonElement; // выбранная кнопка

		// Toggle selection
		if (this.selectedPaymentButton === button) {
			// Отмена выбранного способа
			button.classList.remove('button_alt-active');
			this.selectedPayment = undefined;
		} else {
			// Выбор нового способа
			this.paymentButtonsList.forEach(btn => btn.classList.remove('button_alt-active'));
			button.classList.add('button_alt-active');
			this.selectedPayment = button;
		}

		// this.initRadioGroup(); // инициализация способа оплаты

		// Dispatch custom event
		// container.dispatchEvent(new CustomEvent('selectionChange', {
		// 	detail: { value: this.selectedPaymentButton?.name }
		// }));
	};

	private initRadioGroup(): void {

		// Сброс выбранного способа оплаты
		// this.selectedPaymentButton = undefined;

		// Сброс UI-элементов, отвечающих за выбор способа оплаты
		// this.paymentButtonsList.forEach(button => {
		// 	button.addEventListener('click', this.handleButtonClick.bind(this));
		// });

		// Инициализируем атрибуты доступности
		// this.updateButtonsAccessibility();
	}

	/** Задание категории товара в карточке */
	set selectedPayment(button: HTMLButtonElement | undefined) {
		this.selectedPaymentButton = button;
		// Генерируем событие для изменения данных покупателя в модели данных
		this.events.emit(EVENTS_NAMES.order.set.payment, button);
	}

	/** Задание изображения товара в карточке */
	// set image(path: string) {
	//   this.setImage(this.imageElement, CDN_URL + path, "Картинка карточки");
	// }

	/** Блокировка(true) / разблокировка (false) кнопки перехода на следующую форму оформления заказа */
	set disableNextButton(disabled: boolean) {
		this.nextButton.disabled = disabled;
	}
}
