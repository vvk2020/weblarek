import { IBasket, IBuyer, ICatalog, IOrderData, Price } from "../../types";
import { Catalog } from "./Catalog";

/** КОРЗИНА ПРОДУКТОВ 
* Класс, специализированный для работы со списком товаров.  
* Расширяет класс ProductsList, реализует IBasket */
export class Basket<T extends { readonly id: string; price: Price }> extends Catalog<T> implements IBasket<T> {

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

  /** Добавление товара из каталога в корзину по его ключу  
   * Проверяется наличие товара по идентификатору в каталоге и цены (не null) */
  public addItemByKey(id: string): void {
    const item = this._catalog.getItemByKey(id);
    if (item && item.price) this.addItem(item);
  }

  /** Удаление из корзины товара с указанным идентификатором id.
   * Предварительно проверяется его наличие в корзине. */
  public delItem(id: string): void {
    if (this.hasItem(id)) this.removeItemByKey(id);
  }

  /** Получение массива идентификаторов товаров в корзине */
  getItemsIds(): string[] {
    return this.items.map(item => item.id)
  }

  /** Данные заказа */
  get order(): Omit<IOrderData, keyof IBuyer> {
    return {
      total: this.total, // стоимость товаров в корзине
      items: this.getItemsIds(), // массив идентификаторов товаров в корзине
    }
  }

}