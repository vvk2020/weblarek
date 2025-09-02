import { IApi, ILarekProducts, IOrderData, IPurchaseData } from "../../types";
import { URI_PRODUCTS, URI_ORDER } from "../../utils/constants";

/** API 
 * Специализированный класс для работы с API WEBLAREK  
 * (работа с товарами) */
export class larekAPI {
  protected _api: IApi;
  
  /** API-конструктор */
  constructor(api: IApi) {
    this._api = api;
  }

  /** Запрос списка товаров из ларька (с сервера) */
  public getShopProducts(): Promise<ILarekProducts> {
    return this._api.get<ILarekProducts>(
      URI_PRODUCTS
    );
  }

  /** Запрос на оформление заказа (покупки) */
  placeOrder(orderData: IOrderData): Promise<IPurchaseData> {
    return this._api.post<IPurchaseData>(
      URI_ORDER,
      orderData,
      'POST'
    );
  }
}
