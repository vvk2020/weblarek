import { ICatalog, UUID } from "../../types";

/** КАТАЛОГ ПРЕДМЕТОВ  
* Класс для работы с каталогами предметов (товаров) типа T с уникальным ключом Key, реализующий ICatalog */
export class Catalog<T extends { readonly id: UUID }> implements ICatalog<T> {
  protected _items: Map<UUID, T>;
  protected _selectedItem?: T; // предмет, выбранный из каталога

  constructor(items?: T[]) {
    this._items = new Map<UUID, T>();
    if (items?.length) {
      this.items = items;
    }
  }

  /** Добавление предмета в каталог */
  public addItem(item: T): void {
    this._items.set(item.id, item);
  }

  /** Добавление массива предметов в каталог */
  public addItems(items: T[]): void {
    for (const item of items) {
      this.addItem(item);
    }
  }

  /** Получение предмета по его ключу из каталога */
  public getItemByKey(id: UUID): T | undefined {
    return this._items.get(id);
  }

  /** Очистка каталога предметов + сброс выбранного предмета */
  public clear(): void {
    this.selectedItem = undefined; // сброс выбранного предмета
    this._items.clear(); // очистка каталога
  }

  /** Получение количества предметов в каталоге */
  get size(): number {
    return this._items.size;
  }

  /** Удаление предмета из каталога по его ключу */
  public removeItemByKey(id: UUID): boolean {
    return this._items.delete(id);
  }

  /** Массив предметов каталога */
  get items(): T[] {
    return Array.from(this._items.values());
  }

  set items(items: T[]) {
    this.clear();
    for (const item of items) {
      this.addItem(item);
    }
  }

  /** Проверка наличия предмета в каталоге по его ключу */
  public hasItem(id: UUID): boolean {
    return this._items.has(id);
  }

  /** Выбранный предмет */
  set selectedItem(id: UUID | undefined) {
    if (id && this.hasItem(id)) this._selectedItem = this.getItemByKey(id);
    else this._selectedItem = undefined;
  }

  get selectedItem(): T | undefined {
    return this._selectedItem;
  }
}