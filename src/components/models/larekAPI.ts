import { IApi, IBasket, IBuyer, ILarekProducts, IOrderData, IProduct, IPurchaseData } from "../../types";
import { URI_PRODUCTS, URI_ORDER } from "../../utils/constants";

/** API 
 * Специализированный класс для работы с API WEBLAREK  
 * (работа с товарами) */
export class LarekAPI {
  protected _api: IApi;
  protected _basket: IBasket<IProduct>;
  protected _buyer: IBuyer;

  /** API-конструктор */
  constructor(api: IApi, basket: IBasket<IProduct>, buyer: IBuyer) {
    this._api = api;
    this._basket = basket;
    this._buyer = buyer;
  }

  /** Формирование данных для тела запроса */
  get orderData(): IOrderData {
    return {
      ...this._buyer.data,
      ...this._basket.order,
    } as IOrderData;
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
