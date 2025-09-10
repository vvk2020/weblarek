import { ICatalog, IProduct, Storage } from "../../types";

/** КАТАЛОГ ТОВАРОВ  */
export class Catalog implements ICatalog {
  protected _items: Storage = {}; // хранилище товаров каталога
  protected _selectedItem?: IProduct; // товар, выбранный из каталога

  /** Конструктор каталога товаров  
   * Опционально позволяет инициализировать каталог товаров объектом items типа Storage */
  constructor(items?: Storage) {
    if (items) {
      this._items = items;
    }
  }

  /** Массив товаров в каталоге */
  get items(): IProduct[] {
    return Object.values(this._items);
  }

  set items(items: IProduct[]) {
    this.selectedItem = undefined; // сброс выбранного товара
    this._items = {}; // очистка каталога
    for (const item of items) {
      this._items[item.id] = item;
    }
  }

  /** Выбранный товар */
  get selectedItem(): IProduct | undefined {
    return this._selectedItem;
  }

  set selectedItem(id: string | undefined) {
    if (id && !!this._items[id]) this._selectedItem = this.getItemById(id);
    else this._selectedItem = undefined;
  }

  /** Добавление массива товаров в каталог  
   * (товары с совпадающим id перезаписываются) */
  public addItems(items: IProduct[]): void {
    for (const item of items) {
      this._items[item.id] = item;
    }
  }

  /** Получение товара по его id из каталога */
  public getItemById(id: string): IProduct | undefined {
    return this._items[id];
  }
}