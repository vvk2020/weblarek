import { IOrderFields, IOrderForm } from "../../../types";
import { EVENTS, SELECTORS } from "../../../utils/constants";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

/** ПЕРВАЯ ФОРМА ЗАКАЗА */
export class OrderForm extends Form<IOrderForm> {
	protected paymentBtns: HTMLButtonElement[]; // массив кнопок выбора способа оплаты
	protected selectedPaymentBtn?: HTMLButtonElement; // выбранная кнопка способа оплаты
	protected addressInp: HTMLInputElement; // <input> адреса

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container, events);
		// Определение HTML-элементов в контейнере container
		this.addressInp = container.querySelector(SELECTORS.forms.order.fields.address) as HTMLInputElement;
		const paymentGroupContaner = container.querySelector(SELECTORS.forms.order.fields.payment.container) as HTMLElement; // контейнер кнопок способов оплаты
		this.paymentBtns = Array.from(paymentGroupContaner.querySelectorAll(SELECTORS.forms.order.fields.payment.button));
		// Назначение обработчика выбора способа оплаты
		this.paymentBtns.forEach(button => {
			button.addEventListener('click', this.handlePaymentButtonClick);
		});
		// Назначение обработчика изменения адреса доставки
		this.addressInp.addEventListener('input', () => {
			// Генерирование сообщения об изменении в полях данных фомы OrderForm
			this.events.emit(EVENTS.forms.order.chahgeFields, {
				payment: this.selectedPaymentBtn,
				address: this.addressInp
			} as IOrderFields);
		});
	}

	/** Задание способа оплаты заказа */
	set selectedPayment(button: HTMLButtonElement | undefined) {
		this.selectedPaymentBtn = button;
		// Генерирование сообщения об изменении в полях данных фомы OrderForm
		this.events.emit(EVENTS.forms.order.chahgeFields, {
			payment: button,
			address: this.addressInp
		} as IOrderFields);
	}

	/** Обработчик события выбора способа оплаты */
	private handlePaymentButtonClick = (event: Event) => {
		const button = event.currentTarget as HTMLButtonElement; // выбранная кнопка
		if (this.selectedPaymentBtn === button) {
			// Отмена выбранного способа
			button.classList.remove('button_alt-active');
			this.selectedPayment = undefined;
		} else {
			// Выбор нового способа
			this.paymentBtns.forEach(btn => btn.classList.remove('button_alt-active'));
			button.classList.add('button_alt-active');
			this.selectedPayment = button;
		}
	};

	/** Очистка полей ввода данных и сбросй выбранного способа оплаты */
	public reset(): void {
		super.reset(); // сброс <input>-полей
		// Сброс выбранного способа оплаты
		if (this.selectedPaymentBtn) {
			this.selectedPaymentBtn.classList.remove('button_alt-active');
			this.selectedPaymentBtn = undefined;
		}
		// this.submitButton.disabled = true;
	}
}
