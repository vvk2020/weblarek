import { IList } from "../../types";

/** УНИВЕРСАЛЬНЫЙ СПИСОК  
 * Список, соответствующий IList
 * Создает список сущностей типа T, имеющих ключ Key.
*/
export class List<T, Key extends keyof T = keyof T> implements IList<T, Key> {
  private _items: Map<T[Key], T>;
  private _key: Key;

  /** Создание экзепляра списка в виде коллекции объектов типа T с ключом key.  
   * Опционально задается стартовый массив объектов items типа T. */
  constructor(key: Key, items?: readonly T[]) {
    this._key = key;
    this._items = new Map<T[Key], T>();
    if (items?.length) {
      this.addItems(items);
    }
  }

  /** Добавление объекта в коллекцию */
  public addItem(item: T): void {
    this._items.set(item[this._key], item);
  }

  /** Добавление массива элементов в коллекцию */
  public addItems(items: readonly T[]): void {
    for (const item of items) {
      this.addItem(item);
    }
  }

  /** Получение объекта коллекции по его ключу */
  public getItemByKey(key: T[Key]): T | undefined {
    return this._items.get(key);
  }

  /** Очистка коллекции */
  public clear(): void {
    this._items.clear();
  }

  /** Получение количества объекта в коллекции */
  get size(): number {
    return this._items.size;
  }

  /** Удаление объекта из коллекции по его ключу */
  public removeByKey(key: T[Key]): boolean {
    return this._items.delete(key);
  }

  /** Получение всех объектов коллекции */
  get items(): T[] {
    return Array.from(this._items.values());
  }

  /** Проверка наличия объекта в коллекции по его ключу */
  public hasKey(key: T[Key]): boolean {
    return this._items.has(key);
  }
}