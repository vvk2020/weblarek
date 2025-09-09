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

  /** Добавление (модификация) товара в каталог */
  public addItem(item: IProduct): void {
    this._items[item.id] = item;
  }

  /** Добавление массива товаров в каталог  
   * (товары с совпадающим id перезаписываются)
  */
  public addItems(items: IProduct[]): void {
    for (const item of items) {
      this.addItem(item);
    }
  }

  /** Получение товара по его id из каталога */
  public getItemById(id: string): IProduct | undefined {
    return this._items[id];
  }

  /** Очистка каталога с эффектом сброса выбранного товара */
  public clear(): void {
    this.selectedItem = undefined; // сброс выбранного товара
    this._items = {}; // очистка каталога
  }

  /** Получение количества товаров в каталоге */
  get size(): number {
    return Object.keys(this._items).length;
  }

  /** Удаление товара из каталога по его id  
   * (возвращает false, если товар не найден или не может быть удален) */
  public removeItemById(id: string): boolean {
    return (this.hasItem(id)) ? delete this._items[id] : false;
  }

  /** Массив товаров в каталоге */
  get items(): IProduct[] {
    return Object.values(this._items);
  }

  set items(items: IProduct[]) {
    this.clear();
    for (const item of items) {
      this.addItem(item);
    }
  }

  /** Проверка наличия товара в каталоге по его id */
  public hasItem(id: string): boolean {
    return !!this._items[id];
  }

  /** Выбранный товар (все данные) */
  set selectedItem(id: string | undefined) {
    if (id && this.hasItem(id)) this._selectedItem = this.getItemById(id);
    else this._selectedItem = undefined;
  }

  get selectedItem(): IProduct | undefined {
    return this._selectedItem;
  }
}