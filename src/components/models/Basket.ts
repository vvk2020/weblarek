import { IBasket, IProduct, Price } from "../../types";
import { EVENTS_NAMES } from "../../utils/constants";
import { IEvents } from "../base/Events";

/** КОРЗИНА ПРОДУКТОВ 
* Класс, специализированный для работы со списком товаров.  
* Расширяет класс ProductsList, реализует IBasket */
export class Basket implements IBasket {
  protected _items: IProduct[] = []; // хранилище товаров корзины

  constructor(protected events: IEvents) { }

  /** Массив товаров в корзине */
  get items(): IProduct[] {
    return this._items;
  }

  set items(items: IProduct[]) {
    this._items = [];
    for (const item of items) {
      this.addItem(item);
    }
  }

  /** Получение количества товаров в корзине */
  get itemCount(): number {
    return this._items.length;
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
      // Товар в корзине с таким же id, как у item
      let existItem = this._items.find(prod => prod.id === item.id);
      // Если в корзине товар с item.id уже есть, то перезаписываем его, если нет - добавляем
      if (existItem) {
        existItem = item;
      }
      else {
        this._items.push(item);
      }
      this.events.emit(EVENTS_NAMES.basket.change); // генерирование события изменения корзины
    }
  }

  /** Удаление из корзины товара с его id */
  public delItemById(id: string): void {
    if (this.hasItem(id)) {
      this._items = this._items.filter((item => item.id !== id))
      this.events.emit(EVENTS_NAMES.basket.change); // генерирование события изменения корзины
    };
  }

  /** Проверка наличия товара в корзине по его id */
  public hasItem(id: string): boolean {
    return !!this._items.find(item => item.id === id);
  }

  /** Очистка корзины */
  public clear(): void {
    this._items = [];
    this.events.emit(EVENTS_NAMES.basket.change); // генерирование события изменения корзины
  }
}