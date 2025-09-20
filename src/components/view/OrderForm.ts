import { IOrderFields, IOrderForm } from "../../types";
import { EVENTS_NAMES, SELECTORS } from "../../utils/constants";
import { IEvents } from "../base/Events";
import { Form } from "../common/Form";

/** КЛАСС КАРТОЧКИ ГАЛЕРЕИ */
export class OrderForm extends Form<IOrderForm> {
	protected paymentButtonsList: HTMLButtonElement[]; // массив кнопок выбора способа оплаты
	protected selectedPaymentButton?: HTMLButtonElement; // выбранная кнопка способа оплаты
	protected nextButton: HTMLButtonElement; // <button> перехода к следующей форме
	protected addressInput: HTMLInputElement; // <input> адреса
	protected form: HTMLFormElement; // форма



	constructor(container: HTMLElement, protected events: IEvents) {
		super(container, events);

		// Определение HTML-элементов в контейнере container
		this.nextButton = container.querySelector(SELECTORS.forms.order.orderButton) as HTMLButtonElement;
		this.addressInput = container.querySelector(SELECTORS.forms.order.fields.address) as HTMLInputElement;
		this.form = container as HTMLFormElement;

	// <template id="contacts">
	// 	<form class="form" name="contacts">
	// 		<div class="order">
	// 			<label class="order__field">
	// 				<span class="form__label modal__title">Email</span>
	// 				<input name="email" class="form__input" type="text" placeholder="Введите Email" />
	// 			</label>
	// 			<label class="order__field">
	// 				<span class="form__label modal__title">Телефон</span>
	// 				<input name="phone" class="form__input" type="text" placeholder="+7 (" />
	// 			</label>
	// 		</div>
	// 		<div class="modal__actions">
	// 			<button type="submit" disabled class="button">Оплатить</button>
	// 			<span class="form__errors"></span>
	// 		</div>
	// 	</form>
	// </template>

		const paymentGroupContaner = container.querySelector(SELECTORS.forms.order.fields.payment.container) as HTMLElement; // контейнер кнопок способов оплаты
		this.paymentButtonsList = Array.from(paymentGroupContaner.querySelectorAll(SELECTORS.forms.order.fields.payment.button));

		// Назначение обработчика выбора способа оплаты
		this.paymentButtonsList.forEach(button => {
			button.addEventListener('click', this.handlePaymentButtonClick);
		}); // кнопки задания способа оплаты

		// Назначение обработчика изменения адреса доставки
		this.addressInput.addEventListener('input', () => {
			// Генерирование сообщения об изменении в полях данных фомы OrderForm
			this.events.emit(EVENTS_NAMES.forms.order.chahgeFields, {
				paymentButton: this.selectedPaymentButton,
				addressInput: this.addressInput
			} as IOrderFields);
		});

		// Назначение обработчика кнопки перехода к следующей форме
		console.log('nextButton', this.nextButton);

		this.form.addEventListener('submit', (event: SubmitEvent) => {
			event.preventDefault(); // отмена стандартной отправки форы
			// Генерирование submit-сообщения фомы OrderForm (переход к ContactForm)
			this.events.emit(EVENTS_NAMES.forms.order.submit);
		});
	}

	/** Обработчик click по кнопке способа оплаты */
	private handlePaymentButtonClick = (event: Event) => {
		const button = event.currentTarget as HTMLButtonElement; // выбранная кнопка
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
	};

	/** Задание категории товара в карточке */
	set selectedPayment(button: HTMLButtonElement | undefined) {
		this.selectedPaymentButton = button;
		// Генерирование сообщения об изменении в полях данных фомы OrderForm
		this.events.emit(EVENTS_NAMES.forms.order.chahgeFields, {
			paymentButton: button,
			addressInput: this.addressInput
		} as IOrderFields);
	}

	/** Блокировка(true) / разблокировка (false) кнопки перехода на следующую форму оформления заказа */
	set disableNextButton(disabled: boolean) {
		this.nextButton.disabled = disabled;
	}
}
