import { IBasket, ICatalog, ProductId, ProductPrice } from "../../types";
import { ProductsList } from "./ProductsList";

/** КОРЗИНА ПРОДУКТОВ 
* Класс, специализированный для работы со списком товаров.  
* Расширяет класс ProductsList, реализует IBasket
*/
export class Basket extends ProductsList implements IBasket {

  /** Конструктор экземпляра корзины товаров, принимающий в качестве аргумента экземпляр
   * каталога товаров, соответствующий ICatalog
   */
  constructor(private _catalog: ICatalog) {
    super();
  }

  /** Расчет и получение стоимости корзины */
  get price(): ProductPrice {
    return this.products.reduce(
      (cost, product) => product.price ? cost + product.price : cost,
      0)
  }

  /** Количество товаров в корзине */
  get countProducts(): number {
    return this.size;
  }

  /** Добавление товара из каталога в в корзину по его идентификатору productId.  
   * Предварительно проверяется наличие товара по идентификатору в каталоге. 
   * Товар должен иметь цену.
   * */
  public addProduct(productId: ProductId): void {
    const product = this._catalog.getProductById(productId);
    // Проверка наличия товара с идентификатором productId и ценой с в каталоге 
    if (product && product.price) {
      // Добавление найденного товара из каталога в в корзину
      this.addItem(this._catalog.getProductById(productId)!);
    }
  }

  /** Удаление из корзины товара с указанным идентификатором productId.
   * Предварительно проверяется его наличие в корзине. */
  public delProduct(productId: ProductId): void {
    if (this.hasKey(productId)) this.removeByKey(productId);
  }

  /** Очистка корзины */
  public clear(): void {
    super.clear();
  }

  /** Проверка наличия товара в корзине по его идентикатору */
  public hasProduct(productId: ProductId): boolean {
    return this.hasKey(productId);
  }
}