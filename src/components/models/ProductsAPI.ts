import { IApi, ILarekProducts, IOrderData, IPurchaseData } from "../../types";
import { URI_PRODUCTS, URI_ORDER } from "../../utils/constants";

/** API 
 * Специализированный класс для работы с API WEBLAREK  
 * (работа с товарами) */
export class larekAPI {
  #api: IApi;
  /** API-конструктор */
  constructor(api: IApi) {
    this.#api = api;
  }

  /** Запрос списка товаров из ларька (с сервера) */
  public getShopProducts(): Promise<ILarekProducts> {
    return this.#api.get<ILarekProducts>(
      URI_PRODUCTS
    );
  }

  /** Запрос на оформление заказа (покупки) */
  placeOrder(orderData: IOrderData): Promise<IPurchaseData> {
    return this.#api.post<IPurchaseData>(
      URI_ORDER,
      orderData,
      'POST'
    );
  }
}
