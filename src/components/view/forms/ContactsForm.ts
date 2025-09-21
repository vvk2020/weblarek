import { IContactsFields, IContactsForm } from "../../../types";
import { EVENTS, SELECTORS } from "../../../utils/constants";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

/** ВТОРАЯ ФОРМА ЗАКАЗА */
export class ContactsForm extends Form<IContactsForm> {
	protected emailInp: HTMLInputElement; // <input> email покупателя
	protected phoneInp: HTMLInputElement; // <input> телефона покупателя

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container, events);
		this.emailInp = container.querySelector(SELECTORS.forms.contacts.fields.email) as HTMLInputElement;
		this.phoneInp = container.querySelector(SELECTORS.forms.contacts.fields.phone) as HTMLInputElement;
		// Назначение обработчика изменения в полях ввода
		this.emailInp.addEventListener('input', () => {
			// Генерирование сообщения об изменении в полях данных фомы ContactsForm
			this.events.emit(EVENTS.forms.contacts.chahgeFields, {
				emailInput: this.emailInp,
				phoneInput: this.phoneInp
			} as IContactsFields);
		});

		this.phoneInp.addEventListener('input', () => {
			// Генерирование сообщения об изменении в полях данных фомы ContactsForm
			this.events.emit(EVENTS.forms.contacts.chahgeFields, {
				emailInput: this.emailInp,
				phoneInput: this.phoneInp
			} as IContactsFields);
		});
	}
}
