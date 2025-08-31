import { IApi, IGetResponseAPI } from "../../types";
import { API_URL } from "../../utils/constants";
import { Api } from "../base/Api";

/** API 
 * Специализированный класс для работы с API WEBLAREK  
 * (работа с товарами) */
export class ProductsAPI extends Api implements IApi {
  /** API-конструктор */
  constructor(options?: RequestInit) {
    options ? super(API_URL) : super(API_URL, options);
    console.log('this: ', this);
  }

  public getProducts(): Promise<IGetResponseAPI> {
    return super.get<IGetResponseAPI>("/product/");
  }

  // post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T> {
  //     this.post<>();
  // }
}
