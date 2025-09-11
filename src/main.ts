import './scss/styles.scss';

import { IBuyer, ILarekProducts, IOrderData, IPurchaseData } from './types';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';


import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Catalog } from './components/models/Catalog';
import { API_URL } from './utils/constants';
import { LarekAPI } from './components/models/LarekAPI';

//! ТЕСТЫ ===========================================================

console.group('ТЕСТЫ');

//* КАТАЛОГ ТОВАРОВ ----------------------------------

const catalog = new Catalog();
catalog.items = apiProducts.items; // сохранение массива товаров
catalog.setSelectedItem("b06cde61-912f-4663-9751-09956c0eed67"); // сохранение товара для подробного отображения

console.group('КАТАЛОГ ТОВАРОВ');
console.log('Каталог товаров:\n', catalog);
console.log('Массив товаров каталога:\n', catalog.items); // получение массива товаров
console.log('Выбранный товар каталога:', catalog.selectedItem); // получение товара для подробного отображения
console.log(
  'Товар с id="412bcf81-7e75-4e70-bdb9-d3c73c9803b7":',
  catalog.getItemById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"
  )); // получение товара по id
console.groupEnd(); // КАТАЛОГ ТОВАРОВ

//* КОРЗИНА ТОВАРОВ, ПРИВЯЗАННАЯ К КАТАЛОГУ ----------

let basket = new Basket();
// Добавление товаров из каталога catalog
basket.addItem(catalog.getItemById("854cef69-976d-4c2a-a18c-2aa45046c390")); // price = 750
basket.addItem(catalog.getItemById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7")); // price = 2500
basket.addItem(catalog.getItemById("b06cde61-912f-4663-9751-09956c0eed67")); // price = null => не добавлен
basket.addItem(catalog.getItemById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9")); // price = 1450
basket.delItemById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"); // удаление товара по id
// basket.clear(); // очистка корзины

console.group('КОЗИНА ТОВАРОВ');
console.log('Корзина товаров:\n', basket);
console.log('Массив товаров в корзине:\n', basket.items);
console.log('Расчет стоимости товаров в корзине:', basket.total);
console.log('Количество товаров в корзине:', basket.itemCount);

console.group('ПРОВЕРКА НАЛИЧИЯ ТОВАРА В КОРЗИНЕ');
console.log('badId:', basket.hasItem("badId"));
console.log('854cef69-976d-4c2a-a18c-2aa45046c390:', basket.hasItem("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.groupEnd(); // ПРОВЕРКА НАЛИЧИЯ ТОВАРА В КОРЗИНЕ
console.groupEnd(); // КОЗИНА ТОВАРОВ

//* ПОКУПАТЕЛЬ ---------------------------------------

// Покупатель
const buyer = new Buyer({
  payment: 'online',
  email: 'xyz@mail.ru',
  phone: '+7 (777) 777-77-77',
  address: 'Мавзолей'
});

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
const orderData: IOrderData = // данные для запроса на оформление заказа
{
  // Данные покупателя
  payment: buyer.payment,
  email: buyer.email,
  phone: buyer.phone,
  address: buyer.address,
  // Данные корзины
  total: basket.total,
  items: Object.values(basket.items).map(item => item.id),
};
const productsAPI = new LarekAPI(api);
console.group('API');
productsAPI.getShopProducts()
  .then((data: ILarekProducts) => console.log('Товары в ларьке:\n', data))
  .catch((err: Response) => console.error(err));
productsAPI.placeOrder(orderData)
  .then((data: IPurchaseData) => console.log('Заказ оформлен успешно\n', data))
  .catch((err: Response) => console.error(err));

setTimeout(() => {
  console.groupEnd(); // API
  console.groupEnd(); // ТЕСТЫ
}, 250);