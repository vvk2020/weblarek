/** ТИПЫ МЕДОТОВ API-ЗАПРОСОВ */
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

/** API */
export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

/** ТОВАР */
export interface IProduct {
  id: string; // идентификатор
  description: string; // описание
  image: string; // изображение
  title: string; // название
  category: string; // категория
  price: number | null; // цена
}

/** ИМЯ И ТИП УНИКАЛЬНОГО КЛЮЧА ТОВАРА  */
export const ID_NAME = 'id'; // имя
export type ID_TYPE = typeof ID_NAME; // тип

/** УНИКАЛЬНЫЙ ИДЕНТИФИКАТОР ТОВАРА */
export type ProductId = IProduct[ID_TYPE];

/** СТОИМОСТЬ ТОВАРА */
export type ProductPrice = IProduct['price'];

/** АБСТРАКТНЫЙ СПИСОК  
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
export interface ICatalog extends IList<IProduct, ID_TYPE> {
  products: IProduct[]; // список товаров каталога
  preview: IProduct | undefined; // товар, выбранный для подробного отображения
  getProductById(productId: ProductId): IProduct | undefined; // метод получения товара по идентификатору 
}

/** КОРЗИНА ТОВАРОВ */
export interface IBasket extends IList<IProduct, ID_TYPE> {
  products: IProduct[]; // список товаров в корзине
  price: ProductPrice; // стоимость корзины
  countProducts: number; // количество товаров в корзине
  addProduct(productId: ProductId): void; // метод добавления товара в корзину
  delProduct(productId: ProductId): void; // метод удаления товара из корзины
  clear(): void; // метод очистки корзины
  hasProduct(productId: ProductId): boolean; // метод проверки наличия товара в корзине по его идентикатору
}

/** СПОСОБ ОПЛАТЫ */
export type TPayment = "card" | "cash" | undefined; // FIXME уточнить значения TPayment

/** ПОКУПАТЕЛЬ */
export interface IBuyer {
  payment: TPayment; // способ оплаты
  email: string; // email
  phone: string; // номер телефона
  address: string; // адрес
}