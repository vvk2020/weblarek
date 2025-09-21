import { ICatalog, IProduct } from "../../types";
import { EVENTS } from "../../utils/constants";
import { IEvents } from "../base/Events";

/** КАТАЛОГ ТОВАРОВ  */
export class Catalog implements ICatalog {
  protected _items: IProduct[] = []; // хранилище товаров каталога
  protected _selectedItem?: IProduct; // товар, выбранный из каталога

  /** Конструктор каталога товаров  
   * Опционально позволяет инициализировать каталог товаров объектом items типа Storage */
  constructor(protected events: IEvents, items?: IProduct[]) {
    if (items && items.length > 0) {
      this._items = items;
    }
  }

  /** Массив товаров в каталоге */
  get items(): IProduct[] {
    return this._items;
  }

  set items(items: IProduct[]) {
    this._selectedItem = undefined; // сброс выбранного товара
    this._items = items; // перезапись товаров каталога из items
    this.events.emit(EVENTS.catalog.change);
  }

  /** Выбранный товар */
  get selectedItem(): IProduct | undefined {
    return this._selectedItem;
  }

  set selectedItem(item: IProduct | undefined) {
    this._selectedItem = item;
  }

  /** Задание выбранного товара по id */
  public setSelectedItem(id: string | undefined): void {
    if (id) this._selectedItem = this.getItemById(id);
  }

  /** Добавление массива товаров в каталог  
   * (товары с совпадающим id перезаписываются) */
  public addItems(items: IProduct[]): void {
    for (const item of items) {
      let existItem = this.getItemById(item.id); // товар в каталоге с таким же id, как у item
      // Если в катологе товар с item.id уже есть, то перезаписываем его, если нет - добавляем
      if (existItem) {
        existItem = item;
      }
      else {
        this._items.push(item);
      }
    }
  }

  /** Получение товара по его id из каталога */
  public getItemById(id: string): IProduct | undefined {
    if (id) {
      return this._items.find(item => item.id === id);
    }
  }
}