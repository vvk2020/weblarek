import { IContactsFields, IContactsForm } from "../../../types";
import { EVENTS_NAMES } from "../../../utils/constants";
import { IEvents } from "../../base/Events";
import { Form } from "../../common/Form";

/** КЛАСС КАРТОЧКИ ГАЛЕРЕИ */
export class ContactsForm extends Form<IContactsForm> {
	// protected paymentButtonsList: HTMLButtonElement[]; // массив кнопок выбора способа оплаты
	// protected selectedPaymentButton?: HTMLButtonElement; // выбранная кнопка способа оплаты
	protected emailInput: HTMLInputElement; // <input> email покупателя
	protected phoneInput: HTMLInputElement; // <input> телефона покупателя

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container, events);

		// Определение HTML-элементов в контейнере container
		// this.submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;
		this.emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
		this.phoneInput = container.querySelector('input[name="phone"]') as HTMLInputElement;

		// Назначение обработчика изменения в полях ввода
		this.emailInput.addEventListener('input', () => {
			// Генерирование сообщения об изменении в полях данных фомы ContactsForm
			this.events.emit(EVENTS_NAMES.forms.contacts.chahgeFields, {
				emailInput: this.emailInput,
				phoneInput: this.phoneInput
			} as IContactsFields);
		});

		this.phoneInput.addEventListener('input', () => {
			// Генерирование сообщения об изменении в полях данных фомы ContactsForm
			this.events.emit(EVENTS_NAMES.forms.contacts.chahgeFields, {
				emailInput: this.emailInput,
				phoneInput: this.phoneInput
			} as IContactsFields);
		});
	}
}
