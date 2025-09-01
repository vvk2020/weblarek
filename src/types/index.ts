import { ID_NAME } from "../utils/constants";

//! СЛОЙ ДАННЫХ ================================================

/** ТИП УНИКАЛЬНОГО КЛЮЧА ТОВАРА  */
export type IdType = typeof ID_NAME; // тип

/** УНИКАЛЬНЫЙ ИДЕНТИФИКАТОР ТОВАРА */
export type UUID = `${string}-${string}-${string}-${string}-${string}`;

/** СТОИМОСТЬ ТОВАРА */
export type Price = number;

/** СПОСОБ ОПЛАТЫ */
export type TPayment = "online" | "cash" | undefined;

/** ТОВАР */
export interface IProduct {
  readonly id: UUID; // идентификатор
  description: string; // описание
  image: string; // изображение
  title: string; // название
  category: string; // категория
  price: Price | null; // цена
}

/** УНИВЕРСАЛЬНЫЙ СПИСОК  
 * Интерфейс-прототип для списков товаров галереи и корзины.  
 * Элементы списков галереи и корзины - товары, ключи - уникальные идентификаторы.
 */
export interface IList<T, Key extends keyof T> {
  items: T[]; // массив элементов (товаров)
  size: number; // количество элементов (товаров) в списке
  addItem(item: T): void; // метод добавления элемента (товара) в список
  addItems(items: readonly T[]): void; // метод добавления массива элементов (товаров) в список
  getItemByKey(key: T[Key]): T | undefined; // метод вывода элемента (товара) из списка по его ключу (идентификатору)
  removeByKey(key: T[Key]): boolean; // метод удаления элемента (товара) из списка по его ключу (идентификатору)
  clear(): void; // метод очистки списка
  hasKey(key: T[Key]): boolean; // метод проверки наличия элемента (товара) в списке по его ключу (идентификатору)
}

/** КАТАЛОГ ТОВАРОВ */
export interface ICatalog extends IList<IProduct, IdType> {
  products: IProduct[]; // список товаров каталога
  preview: IProduct | undefined; // товар, выбранный для подробного отображения
  getProductById(productId: UUID): IProduct | undefined; // метод получения товара по идентификатору 
}

/** КОРЗИНА ТОВАРОВ */
export interface IBasket extends IList<IProduct, IdType> {
  products: IProduct[]; // список товаров в корзине
  total: Price; // стоимость корзины
  countProducts: number; // количество товаров в корзине
  addProduct(productId: UUID): void; // метод добавления товара в корзину
  delProduct(productId: UUID): void; // метод удаления товара из корзины
  clear(): void; // метод очистки корзины
  hasProduct(productId: UUID): boolean; // метод проверки наличия товара в корзине по его идентикатору
  getProductsId(): UUID[]; // метод получения массива  идентификаторов товаров в корзине
}

/** ПОКУПАТЕЛЬ */
export interface IBuyer {
  payment: TPayment; // способ оплаты
  email: string; // email
  phone: string; // номер телефона
  address: string; // адрес
}

/** ПОКУПКА */
export interface IOrder {
  orderData: IOrderData; // метод формирования данных для запроса оформления покупки
}

//! КОММУНИКАЦИОННЫЙ СЛОЙ ======================================

/** ТИПЫ МЕДОТОВ API-ЗАПРОСОВ */
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

/** API */
export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

/** УСПЕШНЫЙ ОТВЕТ НА ЗАПРОС СПИСКА ТОВАРОВ */
export interface ILarekProducts {
  total: number;
  items: IProduct[];
}

/** ДАННЫЕ, ПЕРЕДАВАЕМЫЕ В ЗАПРОСЕ ПРИ ОФОРМЛЕНИИ ЗАКАЗА */
export interface IOrderData extends IBuyer {
  total: Price; // стоимость товаров в корзине
  items: UUID[]; // массив идентификаторов товаров в корзине
}

/** ОТВЕТ СЕРВЕРА ПРИ УСПЕШНОМ ОФОРМЛЕНИИ ЗАКАЗА (ПОКУПКЕ) */
export interface IPurchaseData {
  id: UUID[]; // идентификатор заказа
  total: Price; // стоимость покупки
};