import './scss/styles.scss';

import { IBuyer, ILarekProducts, IProduct, IPurchaseData } from './types';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';


import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Catalog } from './components/models/Catalog';
import { API_URL } from './utils/constants';
import { LarekAPI } from './components/models/larekAPI';

//! ТЕСТЫ ===========================================================

console.group('ТЕСТЫ');

//* КАТАЛОГ ТОВАРОВ ----------------------------------

const catalog = new Catalog<IProduct>();
catalog.items = apiProducts.items; // сохранение массива товаров
catalog.selectedItem = "b06cde61-912f-4663-9751-09956c0eed67"; // сохранение товара для подробного отображения

console.group('КАТАЛОГ ТОВАРОВ');
console.log('Каталог товаров:\n', catalog);
console.log('Массив товаров каталога:\n', catalog.items); // получение массива товаров
console.log('Выбранный товар каталога:\n', catalog.selectedItem); // получение товара для подробного отображения
console.log('Товар с id="412bcf81-7e75-4e70-bdb9-d3c73c9803b7":\n',
  catalog.getItemByKey("412bcf81-7e75-4e70-bdb9-d3c73c9803b7")); // получение товара по id
console.groupEnd(); // КАТАЛОГ ТОВАРОВ

//* КОРЗИНА ТОВАРОВ, ПРИВЯЗАННАЯ К КАТАЛОГУ ----------

let basket = new Basket(catalog);
// Добавление товаров по id
basket.addItemByKey("854cef69-976d-4c2a-a18c-2aa45046c390"); // price = 750
basket.addItemByKey("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"); // price = 2500
basket.addItemByKey("b06cde61-912f-4663-9751-09956c0eed67"); // price = null => не добавлен
basket.addItemByKey("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"); // price = 1450
basket.delItem("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"); // удаление товара по id
// basket.clear(); // очистка корзины

console.group('КОЗИНА ТОВАРОВ');
console.log('Корзина товаров:\n', basket);
console.log('Массив товаров в корзине:\n', basket.items);
console.log('Расчет стоимости товаров в корзине:', basket.total);
console.log('Количество товаров в корзине:', basket.size);

console.group('ПРОВЕРКА НАЛИЧИЯ ТОВАРА В КОРЗИНЕ');
console.log('bad-bad-bad-bad-bad:', basket.hasItem("bad-bad-bad-bad-bad"));
console.log('854cef69-976d-4c2a-a18c-2aa45046c390:', basket.hasItem("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.groupEnd(); // ПРОВЕРКА НАЛИЧИЯ ТОВАРА В КОРЗИНЕ

console.log('Массив идентификаторов товаров в корзине:\n', basket.getItemsIds());
console.groupEnd(); // КОЗИНА ТОВАРОВ

//* ПОКУПАТЕЛЬ ---------------------------------------

const buyer = new Buyer({
  payment: 'online',
  email: 'xyz@mail.ru',
  phone: '+7 (777) 777-77-77',
  address: 'Мавзолей'
});

let b2: IBuyer = new Buyer();
b2 = {
  payment: 'online',
  email: 'xyz@mail.ru',
  phone: '+7 (777) 777-77-77',
  address: 'Питер'
}

console.group('ПОКУПАТЕЛЬ');
console.group('ДАННЫЕ');
console.log('Покупатель:', buyer);
console.log('Способ оплаты:', buyer.payment);
console.log('address - адрес:', buyer.address);
console.log('phone - телефон:', buyer.phone);
console.log('email - электронная почта:', buyer.email);
console.groupEnd(); // ДАННЫЕ

console.group('ПРОВЕРКА ВАЛИДНОСТИ');
console.log('- способа оплаты:', buyer.isPaymentValid());
console.log('- адреса:', buyer.isAddressValid());
console.log('- телефона:', buyer.isPhoneValid());
console.log('- email:', buyer.isEmailValid());
console.log('- всех данных:', buyer.isAllValid());
console.groupEnd(); // ПРОВЕРКА ВАЛИДНОСТИ
console.groupEnd(); // ПОКУПАТЕЛЬ

//* API ----------------------------------------------

const api = new Api(API_URL);
const productsAPI = new LarekAPI(api, basket, buyer);
console.group('API');
productsAPI.getShopProducts()
  .then((data: ILarekProducts) => console.log('Товары в ларьке:\n', data))
  .catch((err: Response) => console.error(err));
productsAPI.placeOrder()
  .then((data: IPurchaseData) => console.log('Заказ оформлен успешно\n', data))
  .catch((err: Response) => console.error(err));

setTimeout(() => {
  console.groupEnd(); // API
  console.groupEnd(); // ТЕСТЫ
}, 250);