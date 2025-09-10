import { IApi, IBasket, IBuyer, ILarekProducts, IOrderData, IPurchaseData } from "../../types";
import { URI_PRODUCTS, URI_ORDER } from "../../utils/constants";

/** API 
 * Специализированный класс для работы с API WEBLAREK (работа с товарами) */
export class LarekAPI {

  /** API-конструктор */
  constructor(protected _api: IApi) {
  }

  /** Запрос списка товаров из ларька (с сервера) */
  public getShopProducts(): Promise<ILarekProducts> {
    return this._api.get<ILarekProducts>(URI_PRODUCTS);
  }

  /** Запрос на оформление заказа (покупки) */
  public placeOrder(orderData: IOrderData): Promise<IPurchaseData> {
    return this._api.post<IPurchaseData>(
      URI_ORDER,
      orderData,
      'POST'
    );
  }
}
