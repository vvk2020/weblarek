import { ICatalog, IProduct, Products as Storage } from "../../types";

/** КАТАЛОГ ОБЪЕКТОВ  
* Класс универсального переиспользуемого хранилища объектов типа `T`, имеющих  
* readonly-свойство `id` - уникальный ключ для CRUD-операций с данными хранилища 
* (каталога товаров). */
// export class Catalog<T extends { readonly id: string }> implements ICatalog<T> {
export class Catalog implements ICatalog {
  protected _items: Storage = {}; // объект-хранилище продуктов каталога
  protected _selectedItem?: IProduct; // объект, выбранный из каталога

  constructor(items?: Storage) {
    if (items) {
      this._items = items;
    }
  }

  /** Добавление (модификация) объекта в каталог */
  public addItem(item: IProduct): void {
    this._items[item.id] = item;
  }

  /** Добавление массива объектов в каталог */
  public addItems(items: IProduct[]): void {
    for (const item of items) {
      this.addItem(item);
    }
  }

  /** Получение объекта по его ключу из каталога */
  public getItemById(id: string): IProduct | undefined {
    return this._items[id];
  }

  /** Очистка каталога и сброс выбранного объекта */
  public clear(): void {
    this.selectedItem = undefined; // сброс выбранного объекта
    this._items = {}; // очистка каталога
  }

  /** Получение количества объектов в каталоге */
  get size(): number {
    return Object.keys(this._items).length;
  }

  /** Удаление объекта из каталога по его ключу (возвращает false, если 
   * товара с id не существует или он не может быть удален) */
  public removeItemById(id: string): boolean {
    return (this.hasItem(id)) ? delete this._items[id] : false;
  }

  /** Массив объектов каталога */
  get items(): IProduct[] {
    return Object.values(this._items);
  }

  set items(items: IProduct[]) {
    this.clear();
    for (const item of items) {
      this.addItem(item);
    }
  }

  /** Проверка наличия объекта в каталоге по его ключу */
  public hasItem(id: string): boolean {
    return !!this._items[id];
  }

  /** Выбранный объект */
  set selectedItem(id: string | undefined) {
    if (id && this.hasItem(id)) this._selectedItem = this.getItemById(id);
    else this._selectedItem = undefined;
  }

  get selectedItem(): IProduct | undefined {
    return this._selectedItem;
  }
}