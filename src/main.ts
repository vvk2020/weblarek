import './scss/styles.scss';

import { IProduct } from './types';

interface IList<T, Key extends keyof T> {
  items: T[]; // коллекция хранимых элементов (товаров)
  size: number; // количество элементов (товаров)
  addItem(item: T): void; // метод добавления элемента (товара) в коллекцию
  addItems(items: readonly T[]): void; // метод добавления массива элементов (товаров) в коллекцию
  getItemByKey(key: T[Key]): T | undefined; // метод вывода элемента (товара) из коллекции по его ключу (идентификатору)
  removeByKey(key: T[Key]): boolean; // метод удаления элемента (товара) из коллекции по его ключу (идентификатору)
  clear(): void; // метод очистки коллекции
  hasKey(key: T[Key]): boolean; // метод проверки наличия элемента в списке по его ключу
}

class List<T, Key extends keyof T> implements IList<T, Key> {
  private _items: Map<T[Key], T>;
  private readonly _key: Key;

  /* Конструктор, позволяющий создать коллекцию с помощью переданного массива элементов */
  constructor(key: Key, Items?: readonly T[]) {
    this._key = key;
    this._items = new Map<T[Key], T>();
    if (Items?.length) {
      this.addItems(Items);
    }
  }

  /* Добавление элемента в коллекцию */
  addItem(item: T): void {
    this._items.set(item[this._key], item);
  }

  /* Добавление массива элементов в коллекцию */
  addItems(items: readonly T[]): void {
    for (const item of items) {
      this.addItem(item);
    }
  }

  /* Получение элемента коллекции по его ключу */
  getItemByKey(key: T[Key]): T | undefined {
    return this._items.get(key);
  }

  /* Очистка коллекции */
  clear(): void {
    this._items.clear();
  }

  /* Получение количества элементов в коллекции */
  get size(): number {
    return this._items.size;
  }

  /* Удаление элемента из коллекции по его ключу */
  removeByKey(key: T[Key]): boolean {
    return this._items.delete(key);
  }

  /* Получение всех элементов коллекции */
  get items(): T[] {
    return Array.from(this._items.values());
  }

  /* Проверка наличия элемента в коллекции по его ключу */
  hasKey(key: T[Key]): boolean {
    return this._items.has(key);
  }
}

const pl = new List<IProduct, 'id'>('id');

let u1 = { id: 'a', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 }
let u2 = { id: 'roby', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 }
let u3 = { id: 'c', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 }
let u4 = { id: 'd', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 }
let u5 = { id: 'a', description: 'ooo', image: `string`, title: `string`, category: `string`, price: 777 }
let u6 = { id: 'b', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 }
let u7 = { id: 'x', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 }
let u8 = { id: 'y', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 }
let u9 = { id: 'z', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 }

// ! Копирование ссылок (не значений - см. u5.description ) !
pl.addItem(u1);
pl.addItem(u2);
pl.addItem(u3);
pl.addItem(u4);
pl.addItem(u5);
pl.addItem(u6);

pl.addItems([u7, u8, u9]);

u5.description = '+++++';

console.log('1 pl(', pl.size, ')', pl);
console.log('has', pl.hasKey('4'));
console.log('size', pl.size);

console.log('removeById("a"):', pl.removeByKey('a'));
console.log('removeById("a"):', pl.removeByKey('c'));
console.log('removeById("a"):', pl.removeByKey('u'));
console.log('2 pl(', pl.size, ')', pl);

console.log('pl.hasKey("roby"):', pl.hasKey("roby"));
console.log('pl.hasKey("oby"):', pl.hasKey("oby"));


pl.clear();
console.log('3 pl(', pl.size, ')', pl);



