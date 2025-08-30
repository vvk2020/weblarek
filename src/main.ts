import './scss/styles.scss';

import { IList, ICatalog, IProduct, ProductId, ID_NAME, IBasket } from './types';

class List<T, Key extends keyof T = keyof T> implements IList<T, Key> {
  private _items: Map<T[Key], T>;
  private _key: Key;

  constructor(key: Key, items?: readonly T[]) {
    this._key = key;
    this._items = new Map<T[Key], T>();
    if (items?.length) {
      this.addItems(items);
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

//! List =========================================================
interface ABC {
  a: number;
  b: string;
  c: boolean;
}

const abc = new List<ABC>('c');
abc.addItems([
  { a: 5, b: 'a', c: true },
  { a: 7, b: 'c', c: false },
  { a: 9, b: 'c', c: true },
  { a: 5, b: 'd', c: true },
]);

console.log('===> abc', abc);

const pl = new List<IProduct>('description');
// const pl = new List<IProduct>('id');

let data = [
  { id: 'a', description: 'zxc', image: `s`, title: `string`, category: `string`, price: 777 },
  { id: 'roby', description: 'zxc', image: `st`, title: `string`, category: `string`, price: 777 },
  { id: 'c', description: 'zxc', image: `str`, title: `string`, category: `string`, price: 777 },
  { id: 'd', description: 'zxc', image: `stri`, title: `string`, category: `string`, price: 777 },
  { id: 'a', description: 'ooo', image: `strin`, title: `string`, category: `string`, price: 777 },
  { id: 'b', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 },
  { id: 'x', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 },
  { id: 'y', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 },
  { id: 'z', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 },
]

// ! Копирование ссылок (не значений - см. u5.description ) !
pl.addItems(data);

//! Catalog =========================================================
// console.clear();
class Catalog extends List<IProduct> implements ICatalog {

  constructor(key: keyof IProduct) {
    super(key);
  }

  preview: IProduct | null = null; // товар, выбранный для подробного отображения
  getProductById(productId: ProductId): IProduct | undefined {
    return;
  } // метод получения товара по идентификатору   

  get products() {
    return this.items;
  }
}

// c key='id'
const c = new Catalog(ID_NAME);
c.addItems(data);
console.log('===> c2:', c);
console.log('has "a":', c.hasKey('a'));
console.log('products:', c.products);

//! Basket =========================================================
// class Basket extends List<IProduct> implements IBasket {

//   constructor(key: keyof IProduct) {
//     super(key);
//   }

// }