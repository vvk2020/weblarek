import { IBasket, IBuyer, IOrder, IOrderData } from "../../types";

/** ЗАКАЗ ТОВАРА (ПОКУПКА)  
 * На основе данных корзины и покупателя формирует данные для отправки заказа на сервер */
export class Order implements IOrder {
  protected _buyer: IBuyer;
  protected _basket: IBasket;

  /** Конструктор, принимающий данные о покупателе и его корзине */
  constructor(buyer: IBuyer, basket: IBasket) {
    this._buyer = buyer;
    this._basket = basket;
  }

  /** Формирование данных для отправки заказа на сервер */
  get orderData(): IOrderData {
    return {
      payment: this._buyer.payment,
      email: this._buyer.email,
      phone: this._buyer.phone,
      address: this._buyer.address,
      total: this._basket.total,
      items: this._basket.getProductsId()
    };
  }
}