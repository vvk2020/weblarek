import { ICatalog, IProduct, UUID } from "../../types";
import { ProductsList } from "./ProductsList";

/** КАТАЛОГ ПРОДУКТОВ  
* Класс, специализированный для работы со списком товаров.  
* Расширяет класс ProductsList, реализует ICatalog */
export class Catalog extends ProductsList implements ICatalog {

  /** Товар, выбранный для подробного отображения */
  #preview: IProduct | undefined = undefined;

  /** Выбор товара для подробного отображения */
  set preview(productId: UUID) {
    this.#preview = this.getItemByKey(productId);
  }

  /** Получение товара, выбранного для подробного отображения */
  get preview(): IProduct | undefined {
    return this.#preview;
  }

  /** Получение товара по идентификатору */
  public getProductById(productId: UUID): IProduct | undefined {
    return this.getItemByKey(productId);
  }
}