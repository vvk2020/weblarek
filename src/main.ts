import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Catalog } from './components/models/Catalog';
import './scss/styles.scss';
import { apiProducts } from './utils/data';

//! ТЕСТЫ ===========================================================

//* УНИВЕРСАЛЬНЫЙ СПИСОК
// interface someData {
//   a: number;
//   b: string;
//   c: boolean;
// }

// const someList = new List<someData>('c');
// someList.addItems([
//   { a: 5, b: 'a', c: true },
//   { a: 7, b: 'c', c: false },
//   { a: 9, b: 'c', c: true },
//   { a: 5, b: 'd', c: true },
// ]);

// console.log('===> abc', someList);

//* ТЕСТ ИЗМЕНЕНИЯ КЛЮЧЕЙ
// const pl1 = new List<IProduct>('description');
// const pl2 = new List<IProduct>('id');
// console.log('pl1:', pl1);
// console.log('pl2:', pl2);

//* ДАННЫЕ
// let data = [
//   { id: 'a', description: 'zxc', image: `s`, title: `string`, category: `string`, price: 200 },
//   { id: 'roby', description: 'zxc', image: `st`, title: `string`, category: `string`, price: 700 },
//   { id: 'c', description: 'zxc', image: `str`, title: `string`, category: `string`, price: 150 },
//   { id: 'd', description: 'zxc', image: `stri`, title: `string`, category: `string`, price: 777 },
//   { id: 'a', description: 'ooo', image: `strin`, title: `string`, category: `string`, price: 300 },
//   { id: 'b', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 500 },
//   { id: 'x', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 },
//   { id: 'y', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 },
//   { id: 'z', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 },
// ]

//* КАТАЛОГ
const c1 = new Catalog();
c1.products = apiProducts.items; // или c.addItems(data);
console.log('01 ===> c1:', c1);

//* КОРЗИНА, ПРИВЯЗАННАЯ К КАТАПОГУ
let b1 = new Basket(c1);
// b1.products = data;
// Добавление товара из каталога в корзину по идентификатору
b1.addProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
b1.addProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
b1.addProduct("b06cde61-912f-4663-9751-09956c0eed67");
console.log('02 ===> b1:', b1);
// Удаление по идентификатору
// console.log('03 ===> b1.delProduct("roby"):');
// b1.delProduct("roby");
// console.log('04 ===> b1:', b1);
// Очистка корзины
// console.log('05 ===> b1.clear():');
// b1.clear();
// console.log('06 ===> b1:', b1);
// Получение стоимости корзины
console.log('07 ===> b1.price:', b1.price);
console.log('08 ===> b1.countProducts:', b1.countProducts);
console.log('09 ===> b1.hasProduct("roby"/"robbbbby"):', b1.hasProduct("roby"), b1.hasProduct("robbbbby"));

//* ПОКУПАТЕЛЬ
const buyer1 = new Buyer();
const buyer2 = new Buyer({
  payment: 'cash',
  email: 'xyz@mail.ru',
  phone: '777-777-777',
  address: 'Мавзолей'
});
console.log('buyer:', buyer1);
console.log('buyer:', buyer2);
// Проверка валидации
console.log('buyer1.isEmailValid()', buyer1.isEmailValid());
console.log('buyer2.isEmailValid()', buyer2.isEmailValid());
console.log('buyer1.isPaymentValid()', buyer1.isPaymentValid());
console.log('buyer2.isPaymentValid()', buyer2.isPaymentValid());
console.log('buyer1.isAllValid()', buyer1.isAllValid());
console.log('buyer2.isAllValid()', buyer2.isAllValid());
