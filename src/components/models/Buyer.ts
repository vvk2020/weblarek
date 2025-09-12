import { IBuyer, TPayment } from "../../types";

/** ПОКУПАТЕЛЬ */
export class Buyer {

  protected payment: TPayment = undefined;
  protected email: string = '';
  protected phone: string = '';
  protected address: string = '';

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

  /** Универсальный метод определения свойств */
  public set<K extends keyof IBuyer>(field: K, value: IBuyer[K]): void {
    (this as any)[field] = value;
  }

  /** Данные покупателя в виде объекта */
  get data(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address
    };
  }

  /** Очистка всех данных покупателя */
  public clear() {
    this.payment = undefined;
    this.email = '';
    this.phone = '';
    this.address = '';
  }


  /** Ошибки валидации данных покупателя  
   * Возвращает объект со свойствами, хранящими сообщения об ошибках.  
   * Если ошибок нет, возвращает пустой объект. */
  get errors() {
    const errors = {
      payment: !!(this.payment) ? "" : "Способ оплаты не выбран",
      email: this.email.trim().length > 0 ? "" : "Email не указан",
      phone: this.phone.trim().length > 0 ? "" : "Телефон не указан",
      address: this.address.trim().length > 0 ? "" : "Адрес доставки не указан"
    }
    return Object.fromEntries(
      Object.entries(errors).filter(([_, value]) => value !== "")
    );
  }

  /** Валидность всех данных покупателя  */
  get valid(): boolean {
    return Object.keys(this.errors).length === 0;
  }

}