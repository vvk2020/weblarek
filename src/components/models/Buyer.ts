import { IBuyer, TPayment } from "../../types";

/** ПОКУПАТЕЛЬ */
export class Buyer implements IBuyer {

  #payment: TPayment = undefined;
  #email: string = '';
  #phone: string = '';
  #address: string = '';

  /** Конструктор покупателя.  
   * Опционально определяет все свойства покупетля через buyer
   */
  constructor(buyer?: IBuyer) {
    this.buyer = buyer;
  }

  /** Определение способа оплаты */
  set payment(payment: TPayment) {
    this.#payment = payment;
  }

  /** Получение способа оплаты покупателя */
  get payment() {
    return this.#payment;
  }

  /** Определение email */
  set email(email: string) {
    this.#email = email;
  }

  /** Получение email покупателя */
  get email() {
    return this.#email;
  }

  /** Определение номера телефона */
  set phone(phone: string) {
    this.#phone = phone;
  }

  /** Получение номера телефона покупателя */
  get phone() {
    return this.#phone;
  }

  /** Определение адреса покупателя */
  set address(address: string) {
    this.#address = address;
  }

  /** Получение адреса покупателя */
  get address() {
    return this.#address;
  }

  /** Определение всех данных покупателя */
  set buyer(buyer: IBuyer | undefined) {
    buyer && ({
      payment: this.#payment,
      email: this.#email,
      phone: this.#phone,
      address: this.#address
    } = buyer);
  }

  /** Получение всех данных покупателя */
  get buyer(): IBuyer {
    return {
      payment: this.#payment,
      email: this.#email,
      phone: this.#phone,
      address: this.#address
    }
  }

  /** Очистка всех данных покупателя */
  public clear() {
    this.#payment = undefined;
    this.#email = '';
    this.#phone = '';
    this.#address = '';
  }

  /** Валидация email */
  public isEmailValid(): boolean {
    return this.#email.trim().length > 0;
  }

  /** Валидация номера телефона */
  public isPhoneValid(): boolean {
    return this.#phone.trim().length > 0;
  }

  /** Валидация адреса покупателя */
  public isAddressValid(): boolean {
    return this.#address.trim().length > 0;
  }

  /** Валидация способа оплаты */
  public isPaymentValid(): boolean {
    return !!(this.#payment);
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