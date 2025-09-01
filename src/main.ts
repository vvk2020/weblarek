import './scss/styles.scss';

import { ILarekProducts, IProduct, IPurchaseData } from './types';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';


import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Catalog } from './components/models/Catalog';
import { List } from './components/models/List';
import { larekAPI } from './components/models/larekAPI';
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
console.log('someList - список:\n', someList);
console.log('getItemByKey(9) - получение элемента списка по его ключу:\n', someList.getItemByKey(9));
// console.log('someList.clear() - очистка списка:\n', someList.clear());
console.log('size - :\n', someList.size);
// console.log('someList.removeByKey(5) - удаление элемента списка по ключу:\n', someList.removeByKey(5));
console.log('items - массив элементов списка:\n', someList.items);
console.log('hasKey(9) - проверка наличия элемента в списке по ключу:\n', someList.hasKey(9));
console.groupEnd(); // МЕТОДЫ

//* СПИСКИ С РАЗНЫМИ КЛЮЧАМИ

const list1 = new List<IProduct>('description');
const list2 = new List<IProduct>('id');
console.group('СПИСКИ С РАЗНЫМИ КЛЮЧАМИ');
console.log('list1<IProduct>("description") - список элементов типа IProduct с ключом description:\n', list1);
console.log('list2<IProduct>("id") - список элементов типа IProduct с ключом id:\n', list2);
console.groupEnd();
console.groupEnd(); // УНИВЕРСАЛЬНЫЙ СПИСОК

//* КАТАЛОГ ТОВАРОВ ----------------------------------

const catalog = new Catalog();
catalog.products = apiProducts.items;
catalog.preview = "b06cde61-912f-4663-9751-09956c0eed67";
console.groupCollapsed('КАТАЛОГ ТОВАРОВ');
console.log('catalog - каталог товаров:\n', catalog);
console.log('products - массив товаров каталога:\n', catalog.products);
console.log(
  'getProductById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7") - получение товара по id:\n',
  catalog.getProductById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
console.log('preview - товар для подробного отображения:\n', catalog.preview);
console.groupEnd(); // КАТАЛОГ ТОВАРОВ

//* КОРЗИНА ТОВАРОВ, ПРИВЯЗАННАЯ К КАТАЛОГУ ----------

let basket = new Basket(catalog);
basket.addProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
basket.addProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
basket.addProduct("b06cde61-912f-4663-9751-09956c0eed67"); // price = null, не добавлется в корзину
// basket.delProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
// basket.clear();
console.groupCollapsed('КОЗИНА ТОВАРОВ');
console.log('basket - корзина товаров:\n', basket);
console.log('products - массив товаров корзины:\n', basket.products);
console.log('price - расчет стоимости корзины:', basket.total);
console.log('countProducts - количество товаров в корзине:', basket.countProducts);
console.log('hasProduct("X"):', basket.hasProduct("412bcf81-7e75-4e70-bdb9-error"));
console.log(
  'hasProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7") - проверка наличия элемента в корзине по id:\n',
  basket.hasProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
console.log('getProductsId() - массив идентификаторов товаров в корзине:\n', basket.getProductsId());
console.groupEnd(); // КОЗИНА ТОВАРОВ

//* ПОКУПАТЕЛЬ ---------------------------------------

const buyer1 = new Buyer();
const buyer2 = new Buyer({
  payment: 'online',
  email: 'xyz@mail.ru',
  phone: '+7 (777) 777-77-77',
  address: 'Мавзолей'
});
// buyer1.payment="card"; // для проверки buyer1.isAllValid()
buyer1.email = "xyz@kremlin.ru";
buyer1.phone = "8-800-200-23-16";
buyer1.address = "Горки 9";
const valid = (groupName: string, buyer: Buyer) => {
  console.group(groupName);
  {
    console.group('данные');
    console.log('buyer - покупатель:', buyer);
    console.log('payment - способ оплаты:', buyer.payment);
    console.log('address - адрес:', buyer.address);
    console.log('phone - телефон:', buyer.phone);
    console.log('email - электронная почта:', buyer.email);
    console.groupEnd(); // данные
  }
  {
    console.group('проверка валидности');
    console.log('isPaymentValid() - способа оплаты:', buyer.isPaymentValid());
    console.log('isAddressValid() - адреса:', buyer.isAddressValid());
    console.log('isPhoneValid() - телефона:', buyer.isPhoneValid());
    console.log('isEmailValid() - email:', buyer.isEmailValid());
    console.log('isAllValid() - всех данных покупателя:', buyer.isAllValid());
    console.groupEnd(); // валидация
  }
  console.groupEnd(); // groupName
}
console.groupCollapsed('ПОКУПАТЕЛЬ');
valid('buyer1', buyer1);
valid('buyer2', buyer2);
console.groupEnd(); // ПОКУПАТЕЛЬ

//* ЗАКАЗ --------------------------------------------

console.groupCollapsed('ЗАКАЗ');
const order = new Order(buyer2, basket);
console.log('orderData - данные для отправки заказа на сервер:\n', order.orderData);
console.groupEnd(); // ЗАКАЗ

//* API ----------------------------------------------

const api = new Api(API_URL);
const productsAPI = new larekAPI(api);
console.groupCollapsed('API');
productsAPI.getShopProducts()
  .then((data: ILarekProducts) => console.log('getShopProducts() - товары в ларьке:\n', data))
  .catch((err: Response) => console.error(err));
productsAPI.placeOrder(order.orderData)
  .then((data: IPurchaseData) => console.log('placeOrder() - заказ оформлен\n', data))
  .catch((err: Response) => console.error(err));

setTimeout(() => {
  console.groupEnd(); // API
  console.groupEnd(); // ТЕСТЫ
}, 250);