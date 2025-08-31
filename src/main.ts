import './scss/styles.scss';

import { ILarekProducts, IProduct, IPurchaseData } from './types';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';


import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Catalog } from './components/models/Catalog';
import { List } from './components/models/List';
import { larekAPI } from './components/models/ProductsAPI';
import { API_URL } from './utils/constants';
import { Order } from './components/models/Order';

//! ТЕСТЫ ===========================================================

console.group('ТЕСТЫ');

//* УНИВЕРСАЛЬНЫЙ СПИСОК -----------------------------

console.groupCollapsed('УНИВЕРСАЛЬНЫЙ СПИСОК');

//* МЕТОДЫ

interface ISomeType {
  a: number;
  b: string;
  c: boolean;
}
//Тест создания списка, содержащего элементы типа ISomeType с ключом 'c'
const someList = new List<ISomeType>('a');
someList.addItem({ a: 17, b: 'x', c: false });
someList.addItems([
  { a: 5, b: 'a', c: true },
  { a: 7, b: 'c', c: false },
  { a: 9, b: 'c', c: true },
  { a: 5, b: 'd', c: true },
]);
console.group('МЕТОДЫ');
console.log('someList', someList);
console.log('someList.getItemByKey(9):', someList.getItemByKey(9));
// console.log('someList.clear():', someList.clear());
console.log('someList.size:', someList.size);
// console.log('someList.removeByKey(5):', someList.removeByKey(5));
console.log('someList.items:', someList.items);
console.log('someList.hasKey(9):', someList.hasKey(9));
console.groupEnd();

//* СПИСКИ С РАЗНЫМИ КЛЮЧАМИ

const list1 = new List<IProduct>('description');
const list2 = new List<IProduct>('id');
console.group('СПИСКИ С РАЗНЫМИ КЛЮЧАМИ');
console.log('list1("description"):', list1);
console.log('list2("id"):', list2);
console.groupEnd();
console.groupEnd();

//* КАТАЛОГ ТОВАРОВ ----------------------------------

const catalog = new Catalog();
catalog.products = apiProducts.items;
catalog.preview = "b06cde61-912f-4663-9751-09956c0eed67";
console.groupCollapsed('КАТАЛОГ ТОВАРОВ');
console.log('catalog:', catalog);
console.log('catalog.products:', catalog.products);
console.log('catalog.getProductById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"):', catalog.getProductById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
console.log('catalog.preview:', catalog.preview);
console.groupEnd();

//* КОРЗИНА ТОВАРОВ, ПРИВЯЗАННАЯ К КАТАЛОГУ ----------

let basket = new Basket(catalog);
basket.addProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
basket.addProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
basket.addProduct("b06cde61-912f-4663-9751-09956c0eed67"); // price = null, не добавлется в корзину
// basket.delProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
// basket.clear();
console.groupCollapsed('КОЗИНА ТОВАРОВ');
console.log('basket:', basket);
console.log('basket.products:', basket.products);
console.log('basket.price:', basket.total);
console.log('basket.countProducts:', basket.countProducts);
console.log('basket.hasProduct("X"):', basket.hasProduct("412bcf81-7e75-4e70-bdb9-error"));
console.log('basket.hasProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"):', basket.hasProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
console.log('basket.getProductsId();:', basket.getProductsId());
console.groupEnd();

//* ПОКУПАТЕЛЬ ---------------------------------------

const buyer1 = new Buyer();
const buyer2 = new Buyer({
  payment: 'online',
  email: 'xyz@mail.ru',
  phone: '777-777-777',
  address: 'Мавзолей'
});
// buyer1.payment="card"; // для проверки buyer1.isAllValid()
buyer1.email = "xyz@kremlin.ru";
buyer1.phone = "8-800-200-23-16";
buyer1.address = "Горки 9";
const valid = (groupName: string, buyer: Buyer) => {
  console.group(groupName);
  {
    console.group('data');
    console.log('buyer:', buyer);
    console.log('payment:', buyer.payment);
    console.log('address:', buyer.address);
    console.log('phone:', buyer.phone);
    console.log('email:', buyer.email);
    console.groupEnd();
  }
  {
    console.group('validation');
    console.log('isPaymentValid()', buyer.isPaymentValid());
    console.log('isAddressValid()', buyer.isAddressValid());
    console.log('isPhoneValid()', buyer.isPhoneValid());
    console.log('isEmailValid()', buyer.isEmailValid());
    console.log('isAllValid()', buyer.isAllValid());
    console.groupEnd();
  }
  console.groupEnd();
}
console.groupCollapsed('ПОКУПАТЕЛЬ');
valid('buyer1', buyer1);
valid('buyer2', buyer2);
console.groupEnd();

//* ЗАКАЗ --------------------------------------------

console.groupCollapsed('ЗАКАЗ');
const order = new Order(buyer2, basket);
console.log('order.orderData:', order.orderData);
console.groupEnd();

//* API ----------------------------------------------

const api = new Api(API_URL);
const productsAPI = new larekAPI(api);
console.groupCollapsed('API');
productsAPI.getShopProducts()
  .then((data: ILarekProducts) => console.log('Товары в ларьке:', data))
  .catch((err: Response) => console.error(err));
productsAPI.placeOrder(order.orderData)
  .then((data: IPurchaseData) => console.log('Заказ оформлен', data))
  .catch((err: Response) => console.error(err));

setTimeout(() => {
  console.groupEnd(); // закрывает раздел "API"
  console.groupEnd(); // закрывает раздел "ТЕСТЫ"
}, 250);

// ;