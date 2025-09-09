import { IBasket, IBuyer, ICatalog, IOrderData, Price } from "../../types";
import { Catalog } from "./Catalog";

/** КОРЗИНА ПРОДУКТОВ 
* Класс, специализированный для работы со списком товаров.  
* Расширяет класс ProductsList, реализует IBasket */
export class Basket extends Catalog implements IBasket {

  protected _catalog: ICatalog; // каталог с товарами

  /** Конструктор экземпляра корзины товаров, принимающий в качестве аргумента  
   * экземпляр каталога товаров */
  constructor(catalog: ICatalog) {
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
   * (проверяется наличие товара по идентификатору в каталоге и цены по !null) */
  public addItemById(id: string): void {
    const item = this._catalog.getItemById(id);
    if (item && item.price) this.addItem(item);
  }

  /** Удаление из корзины товара с указанным идентификатором id  
   * (предварительно проверяется его наличие в корзине) */
  public delItemById(id: string): void {
    this.removeItemById(id);
  }

  /** Получение массива идентификаторов товаров в корзине */
  getItemsIds(): string[] {
    return Object.keys(this._items)
    // this.items.map(item => item.id)
  }

  /** Данные заказа */
  get order(): Omit<IOrderData, keyof IBuyer> {
    return {
      total: this.total, // стоимость товаров в корзине
      items: this.getItemsIds(), // массив идентификаторов товаров в корзине
    }
  }

}