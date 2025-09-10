import { IBuyer, TPayment } from "../../types";

/** ПОКУПАТЕЛЬ */
export class Buyer implements IBuyer {

  protected _payment: TPayment = undefined;
  protected _email: string = '';
  protected _phone: string = '';
  protected _address: string = '';

  /** Конструктор покупателя  
   * Опционально могут определены все или часть свойств покупетля */
  constructor(buyer?: Partial<IBuyer>) {
    if (buyer) {
      if (buyer.payment) this.payment = buyer.payment;
      if (buyer.email) this.email = buyer.email;
      if (buyer.phone) this.phone = buyer.phone;
      if (buyer.address) this.address = buyer.address;
    }
  }

  /** Определение способа оплаты */
  get payment() {
    return this._payment;
  }

  set payment(payment: TPayment) {
    this._payment = payment;
  }

  /** email */
  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  /** Номер телефона */
  get phone() {
    return this._phone;
  }

  set phone(phone: string) {
    this._phone = phone;
  }

  /** Адрес покупателя */
  get address() {
    return this._address;
  }

  set address(address: string) {
    this._address = address;
  }

  /** Очистка всех данных покупателя */
  public clear() {
    this._payment = undefined;
    this._email = '';
    this._phone = '';
    this._address = '';
  }

  /** Валидация email */
  public isEmailValid(): string {
    return this._email.trim().length > 0 ? "" : "Email не указан";
  }

  /** Валидация номера телефона */
  public isPhoneValid(): string {
    return this._phone.trim().length > 0 ? "" : "Телефон не указан";
  }

  /** Валидация адреса покупателя */
  public isAddressValid(): string {
    return this._address.trim().length > 0 ? "" : "Адрес доставки не указан";
  }

  /** Валидация способа оплаты */
  public isPaymentValid(): string {
    return !!(this._payment) ? "" : "Способ оплаты не выбран";
  }

  /** Валидация всех полей */
  public isAllValid(): boolean {
    return (
      !!this.isPaymentValid() &&
      !!this.isEmailValid() &&
      !!this.isPhoneValid() &&
      !!this.isAddressValid()
    )
  }

}