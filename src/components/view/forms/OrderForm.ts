import { IOrderFields, IOrderForm, TPayment } from "../../../types";
import { EVENTS, SELECTORS } from "../../../utils/constants";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";


/** ПЕРВАЯ ФОРМА ЗАКАЗА */
export class OrderForm extends Form<IOrderForm> {
	protected paymentBtns: HTMLButtonElement[]; // массив кнопок выбора способа оплаты
	// protected selectedPaymentBtn?: HTMLButtonElement; // выбранная кнопка способа оплаты
	protected addressInp: HTMLInputElement; // <input> адреса

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container, events);
		// Определение HTML-элементов в контейнере container
		this.addressInp = container.querySelector(SELECTORS.forms.order.fields.address) as HTMLInputElement;
		const paymentGroupContaner = container.querySelector(SELECTORS.forms.order.fields.payment.container) as HTMLElement; // контейнер кнопок способов оплаты
		this.paymentBtns = Array.from(paymentGroupContaner.querySelectorAll(SELECTORS.forms.order.fields.payment.button));
		// Назначение обработчика выбора способа оплаты
		this.paymentBtns.forEach(button => {
			button.addEventListener('click', (evt) => {
				// Генерирование сообщения об изменении в полях данных фомы OrderForm
				this.events.emit(EVENTS.forms.order.chahgeFields, {
					payment: evt.target as HTMLButtonElement,
				} as Partial<IOrderFields>);
			});
		});
		// Назначение обработчика изменения значения в поле ввода адреса
		this.addressInp.addEventListener('input', (evt) => {
			// Генерирование сообщения об изменении в полях данных фомы OrderForm
			this.events.emit(EVENTS.forms.order.chahgeFields, {
				address: this.addressInp,
			} as Partial<IOrderFields>);
		});
	}

	/** Отображение выбранного способа оплаты заказа по его HTMLButtonElement.name */
	set payment(paymentKey: string | undefined) {
		this.resetPayment(); // сброс отображения предыдущего выбора способа оплаты
		if (paymentKey) {
			const paymentButton = this.paymentBtns.find((btn) => btn.name === paymentKey)
			paymentButton?.classList.add('button_alt-active');
		}
	}

	/** Сброс отображения выбранного способа оплаты */
	private resetPayment() {
		this.paymentBtns.forEach(btn => btn.classList.remove('button_alt-active'))
	}

	/** Сброс формы к default-состоянию */
	public reset(): void {
		super.reset(); // очистка полей ввода данных
		this.resetPayment(); // cброс способа оплаты
	}
}
