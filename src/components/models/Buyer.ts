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
      for (const key of Object.keys(buyer)) {
        const buyerKey = key as keyof IBuyer;
        if (buyer[buyerKey]) this.set(buyerKey, buyer[buyerKey]);
      }
    }
  }

  /** Универсальный метод определения защищенных свойств, имя которых начинается сипрефикса '_' */
  public set<K extends keyof IBuyer>(field: K, value: IBuyer[K]): void {
    (this as any)[`_${field}`] = value;
  }

  /** Определение способа оплаты */
  get payment() {
    return this._payment;
  }

  /** email */
  get email() {
    return this._email;
  }

  /** Номер телефона */
  get phone() {
    return this._phone;
  }

  /** Адрес покупателя */
  get address() {
    return this._address;
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
      !this.isPaymentValid() &&
      !this.isEmailValid() &&
      !this.isPhoneValid() &&
      !this.isAddressValid()
    )
  }

}