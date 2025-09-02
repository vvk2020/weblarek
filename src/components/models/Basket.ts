import { IBasket, IBuyer, ICatalog, IOrder, Price, UUID } from "../../types";
import { Catalog } from "./Catalog";

/** КОРЗИНА ПРОДУКТОВ 
* Класс, специализированный для работы со списком товаров.  
* Расширяет класс ProductsList, реализует IBasket */
export class Basket<T extends { readonly id: UUID; price: Price }> extends Catalog<T> implements IBasket<T> {

  protected _catalog: ICatalog<T>; // каталог с товарами

  /** Конструктор экземпляра корзины товаров, принимающий в качестве аргумента  
   * экземпляр каталога товаров, реализующий ICatalog */
  constructor(catalog: ICatalog<T>) {
    super();
    this._catalog = catalog;
  }

  /** Расчет и получение стоимости корзины */
  get total(): Price {
    return this.items.reduce(
      (cost, item) => item.price ? cost + item.price : cost,
      0)
  }

  /** Данные заказа */
  get order(): Omit<IOrder, keyof IBuyer> {
    return {
      total: this.total, // стоимость товаров в корзине
      items: this.getItemsIds(), // массив идентификаторов товаров в корзине
    }
  }

  /** Добавление товара из каталога в корзину по его ключу  
   * Проверяется наличие товара по идентификатору в каталоге и цены (не null) */
  public addItemByKey(id: UUID): void {
    const item = this._catalog.getItemByKey(id);
    if (item && item.price) this.addItem(item);
  }

  /** Удаление из корзины товара с указанным идентификатором id.
   * Предварительно проверяется его наличие в корзине. */
  public delItem(id: UUID): void {
    if (this.hasItem(id)) this.removeItemByKey(id);
  }

  /** Получение массива идентификаторов товаров в корзине */
  getItemsIds(): UUID[] {
    return this.items.map(item => item.id)
  }

}