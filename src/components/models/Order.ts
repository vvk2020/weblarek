import { IBasket, IBuyer, IOrder, IOrderData } from "../../types";

/** ЗАКАЗ ТОВАРА (ПОКУПКА)  
 * На основе данных корзины и покупателя формирует данные для отправки заказа на сервер */
export class Order implements IOrder {
  #buyer: IBuyer;
  #basket: IBasket;

  /** Конструктор, принимающий данные о покупателе и его корзине */
  constructor(buyer: IBuyer, basket: IBasket) {
    this.#buyer = buyer;
    this.#basket = basket;
  }

  /** Формирование данных для отправки заказа на сервер */
  get orderData(): IOrderData {
    return {
      payment: this.#buyer.payment,
      email: this.#buyer.email,
      phone: this.#buyer.phone,
      address: this.#buyer.address,
      total: this.#basket.total,
      items: this.#basket.getProductsId()
    };
  }
}