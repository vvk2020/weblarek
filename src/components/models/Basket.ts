import { IBasket, ICatalog, UUID, Price } from "../../types";
import { ProductsList } from "./ProductsList";

/** КОРЗИНА ПРОДУКТОВ 
* Класс, специализированный для работы со списком товаров.  
* Расширяет класс ProductsList, реализует IBasket */
export class Basket extends ProductsList implements IBasket {

  /** Конструктор экземпляра корзины товаров, принимающий в качестве аргумента экземпляр
   * каталога товаров, соответствующий ICatalog */
  constructor(private _catalog: ICatalog) {
    super();
  }

  /** Расчет и получение стоимости корзины */
  get total(): Price {
    return this.products.reduce(
      (cost, product) => product.price ? cost + product.price : cost,
      0)
  }

  /** Количество товаров в корзине */
  get countProducts(): number {
    return this.size;
  }

  /** Добавление товара из каталога в в корзину по его идентификатору id.  
   * Предварительно проверяется наличие товара по идентификатору в каталоге. 
   * Товар должен иметь цену. */
  public addProduct(id: UUID): void {
    const product = this._catalog.getProductById(id);
    // Проверка наличия товара с идентификатором productId и ценой с в каталоге 
    if (product && product.price) {
      // Добавление найденного товара из каталога в в корзину
      this.addItem(this._catalog.getProductById(id)!);
    }
  }

  /** Удаление из корзины товара с указанным идентификатором id.
   * Предварительно проверяется его наличие в корзине. */
  public delProduct(id: UUID): void {
    if (this.hasKey(id)) this.removeByKey(id);
  }

  /** Очистка корзины */
  public clear(): void {
    super.clear();
  }

  /** Проверка наличия товара в корзине по его идентикатору */
  public hasProduct(id: UUID): boolean {
    return this.hasKey(id);
  }

  /** Получение массива идентификаторов товаров в корзине */
  getProductsId(): UUID[] {
    return this.products.map(product => product.id)
  }

}