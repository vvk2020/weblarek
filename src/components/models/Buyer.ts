import { IBuyer, TPayment } from "../../types";

/** ПОКУПАТЕЛЬ */
export class Buyer implements IBuyer {

  protected _payment: TPayment = undefined;
  protected _email: string = '';
  protected _phone: string = '';
  protected _address: string = '';

  /** Конструктор покупателя.  
   * Опционально определяет все свойства покупетля через buyer
   */
  constructor(buyer?: IBuyer) {
    this.buyer = buyer;
  }

  /** Определение способа оплаты */
  set payment(payment: TPayment) {
    this._payment = payment;
  }

  /** Получение способа оплаты покупателя */
  get payment() {
    return this._payment;
  }

  /** Определение email */
  set email(email: string) {
    this._email = email;
  }

  /** Получение email покупателя */
  get email() {
    return this._email;
  }

  /** Определение номера телефона */
  set phone(phone: string) {
    this._phone = phone;
  }

  /** Получение номера телефона покупателя */
  get phone() {
    return this._phone;
  }

  /** Определение адреса покупателя */
  set address(address: string) {
    this._address = address;
  }

  /** Получение адреса покупателя */
  get address() {
    return this._address;
  }

  /** Определение всех данных покупателя */
  set buyer(buyer: IBuyer | undefined) {
    buyer && ({
      payment: this.payment,
      email: this._email,
      phone: this._phone,
      address: this._address
    } = buyer);
  }

  /** Получение всех данных покупателя */
  get buyer(): IBuyer {
    return {
      payment: this.payment,
      email: this._email,
      phone: this._phone,
      address: this._address
    }
  }

  /** Очистка всех данных покупателя */
  public clear() {
    this.payment = undefined;
    this._email = '';
    this._phone = '';
    this._address = '';
  }

  /** Валидация email */
  public isEmailValid(): boolean {
    return this._email.trim().length > 0;
  }

  /** Валидация номера телефона */
  public isPhoneValid(): boolean {
    return this._phone.trim().length > 0;
  }

  /** Валидация адреса покупателя */
  public isAddressValid(): boolean {
    return this._address.trim().length > 0;
  }

  /** Валидация способа оплаты */
  public isPaymentValid(): boolean {
    return !!(this.payment);
  }

  /** Валидация всех полей */
  public isAllValid(): boolean {
    return (
      this.isPaymentValid() &&
      this.isEmailValid() &&
      this.isPhoneValid() &&
      this.isAddressValid()
    )
  }

}