import { IOrderFields, IOrderForm } from "../../../types";
import { EVENTS_NAMES, SELECTORS } from "../../../utils/constants";
import { IEvents } from "../../base/Events";
import { Form } from "../../common/Form";

/** КЛАСС КАРТОЧКИ ГАЛЕРЕИ */
export class OrderForm extends Form<IOrderForm> {
	protected paymentButtonsList: HTMLButtonElement[]; // массив кнопок выбора способа оплаты
	protected selectedPaymentButton?: HTMLButtonElement; // выбранная кнопка способа оплаты
	protected addressInput: HTMLInputElement; // <input> адреса

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container, events);

		// Определение HTML-элементов в контейнере container
		this.addressInput = container.querySelector(SELECTORS.forms.order.fields.address) as HTMLInputElement;
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
	}

	/** Задание категории товара в карточке */
	set selectedPayment(button: HTMLButtonElement | undefined) {
		this.selectedPaymentButton = button;
		// Генерирование сообщения об изменении в полях данных фомы OrderForm
		this.events.emit(EVENTS_NAMES.forms.order.chahgeFields, {
			paymentButton: button,
			addressInput: this.addressInput
		} as IOrderFields);
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

	/** Сброс <input>-полей и выбора способа оплаты */
	public reset() {
		super.reset(); // сброс <input>-полей
		// Сброс выбранного способа оплаты
		if (this.selectedPaymentButton) {
			this.selectedPaymentButton.classList.remove('button_alt-active');
			this.selectedPaymentButton = undefined;
		}
		// this.submitButton.disabled = true;
	}
}
