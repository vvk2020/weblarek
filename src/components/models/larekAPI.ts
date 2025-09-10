import { IApi, IBasket, IBuyer, ILarekProducts, IOrderData, IPurchaseData } from "../../types";
import { URI_PRODUCTS, URI_ORDER } from "../../utils/constants";

/** API 
 * Специализированный класс для работы с API WEBLAREK (работа с товарами) */
export class LarekAPI {
  protected _api: IApi;
  protected _basket: IBasket;
  protected _buyer: IBuyer;

  /** API-конструктор */
  constructor(api: IApi, basket: IBasket, buyer: IBuyer) {
    this._api = api;
    this._basket = basket;
    this._buyer = buyer;
  }

  /** Формирование данных для тела запроса */
  get orderData(): IOrderData {
    // Массив id товаров корзины
    const ids: string[] = Object.values(this._basket.items)
      .map(item => item.id);
    return {
      // Данные покупателя
      payment: this._buyer.payment,
      email: this._buyer.email,
      phone: this._buyer.phone,
      address: this._buyer.address,
      // Данные корзины
      total: this._basket.total,
      items: ids,
    };
  }

  /** Запрос списка товаров из ларька (с сервера) */
  public getShopProducts(): Promise<ILarekProducts> {
    return this._api.get<ILarekProducts>(URI_PRODUCTS);
  }

  /** Запрос на оформление заказа (покупки) */
  placeOrder(): Promise<IPurchaseData> {
    return this._api.post<IPurchaseData>(
      URI_ORDER,
      this.orderData,
      'POST'
    );
  }
}
