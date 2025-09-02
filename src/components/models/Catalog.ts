import { ICatalog, IProduct, UUID } from "../../types";
import { ProductsList } from "./ProductsList";

/** КАТАЛОГ ПРОДУКТОВ  
* Класс, специализированный для работы со списком товаров.  
* Расширяет класс ProductsList, реализует ICatalog */
export class Catalog extends ProductsList implements ICatalog {

  /** Товар, выбранный для подробного отображения */
  protected _preview: IProduct | undefined = undefined;

  /** Товар для подробного отображения */
  set preview(productId: UUID) {
    this._preview = this.getItemByKey(productId);
  }

  get preview(): IProduct | undefined {
    return this._preview;
  }

  /** Получение товара по идентификатору */
  public getProductById(productId: UUID): IProduct | undefined {
    return this.getItemByKey(productId);
  }
}