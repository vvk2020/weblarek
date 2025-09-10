import { IBasket, IProduct, Price, Storage } from "../../types";

/** КОРЗИНА ПРОДУКТОВ 
* Класс, специализированный для работы со списком товаров.  
* Расширяет класс ProductsList, реализует IBasket */
export class Basket implements IBasket {
  protected _items: Storage = {}; // хранилище товаров корзины

  /** Массив товаров в корзине */
  get items(): IProduct[] {
    return Object.values(this._items);
  }

  set items(items: IProduct[]) {
    this.clear();
    for (const item of items) {
      this.addItem(item);
    }
  }

  /** Получение количества товаров в корзине */
  get itemCount(): number {
    return Object.keys(this._items).length;
  }

  /** Расчет и получение стоимости корзины */
  get total(): Price {
    return Object.values(this._items).reduce(
      (cost, item) => item.price ? cost + item.price : cost,
      0);
  }

  /** Добавление товара в корзину  
   * 1. Если товар с таким же id существует, то он модифицируется
   * 2. Товар должен иметь цену (!null) */
  public addItem(item?: IProduct): void {
    if (item && item.price) {
      this._items[item.id] = item;
    }
  }

  /** Удаление из корзины товара с указанным id  
   * (возвращает false, если товар не найден или не может быть удален) */
  public delItemById(id: string): boolean {
    return (this.hasItem(id)) ? delete this._items[id] : false;
  }

  /** Проверка наличия товара в корзине по его id */
  public hasItem(id: string): boolean {
    return !!this._items[id];
  }

  /** Очистка корзины */
  public clear(): void {
    this._items = {};
  }
}