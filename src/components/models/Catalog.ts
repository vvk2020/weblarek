import { ICatalog, UUID } from "../../types";

/** КАТАЛОГ ОБЪЕКТОВ  
* Класс универсального переиспользуемого хранилища объектов типа `T`, имеющих  
* readonly-свойство `id` типа `UUID` - уникальный ключ для CRUD-операций с  
* данными хранилища (каталога товаров). */
export class Catalog<T extends { readonly id: UUID }> implements ICatalog<T> {
  protected _items: Map<UUID, T>; // коллекция объектов
  protected _selectedItem?: T; // объект, выбранный из каталога

  constructor(items?: T[]) {
    this._items = new Map<UUID, T>();
    if (items?.length) {
      this.items = items;
    }
  }

  /** Добавление объекта в каталог */
  public addItem(item: T): void {
    this._items.set(item.id, item);
  }

  /** Добавление массива объектов в каталог */
  public addItems(items: T[]): void {
    for (const item of items) {
      this.addItem(item);
    }
  }

  /** Получение объекта по его ключу из каталога */
  public getItemByKey(id: UUID): T | undefined {
    return this._items.get(id);
  }

  /** Очистка каталога и сброс выбранного объекта */
  public clear(): void {
    this.selectedItem = undefined; // сброс выбранного объекта
    this._items.clear(); // очистка каталога
  }

  /** Получение количества объектов в каталоге */
  get size(): number {
    return this._items.size;
  }

  /** Удаление объекта из каталога по его ключу */
  public removeItemByKey(id: UUID): boolean {
    return this._items.delete(id);
  }

  /** Массив объектов каталога */
  get items(): T[] {
    return Array.from(this._items.values());
  }

  set items(items: T[]) {
    this.clear();
    for (const item of items) {
      this.addItem(item);
    }
  }

  /** Проверка наличия объекта в каталоге по его ключу */
  public hasItem(id: UUID): boolean {
    return this._items.has(id);
  }

  /** Выбранный объект */
  set selectedItem(id: UUID | undefined) {
    if (id && this.hasItem(id)) this._selectedItem = this.getItemByKey(id);
    else this._selectedItem = undefined;
  }

  get selectedItem(): T | undefined {
    return this._selectedItem;
  }
}