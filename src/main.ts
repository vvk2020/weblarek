import './scss/styles.scss';

import { IProduct, ProductId } from './types';


class ProdList<T extends { id: ProductId }> {
  private _items = new Map<ProductId, T>();

  add(item: T): void {
    this._items.set(item.id, item);
  }

  hasId(id: string): boolean {
    return this._items.has(id);
  }

  getById(id: string): T | undefined {
    return this._items.get(id);
  }

  get size(): number {
    return this._items.size;
  }
}

let pl = new ProdList<IProduct>;

let u1 = { id: 'a', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 }
let u2 = { id: 'b', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 }
let u3 = { id: 'c', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 }
let u4 = { id: 'd', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 }
let u5 = { id: 'a', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 }
let u6 = { id: 'b', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 }

pl.add(u1);
pl.add(u2);
pl.add(u3);
pl.add(u4);
pl.add(u5);
pl.add(u6);

console.log('pl', pl);
console.log('has', pl.hasId('4'));
console.log('size', pl.size);

