//! СЛОЙ ДАННЫХ ================================================

/** СТОИМОСТЬ ТОВАРА */
export type Price = number | null;

/** СПОСОБ ОПЛАТЫ */
export type TPayment = "online" | "cash" | undefined;

/** ТОВАР */
export interface IProduct {
  readonly id: string; // идентификатор
  description: string; // описание
  image: string; // изображение
  title: string; // название
  category: string; // категория
  price: Price; // цена
}

export type Products = { [id: string]: IProduct }; // объект-хранилище продуктов

/** КАТАЛОГ ТОВАРОВ */
export interface ICatalog {
  items: IProduct[]; // массив предметов в каталоге
  size: number; // количество предметов в каталоге
  selectedItem: IProduct | undefined; // предмет, выбранный из каталога
  addItem(item: IProduct): void; // метод добавления предмета в каталог
  addItems(items: IProduct[]): void; // метод добавления массива предметов в каталоге
  getItemById(id: string): IProduct | undefined; // метод вывода предмета из каталога по его ключу
  removeItemById(id: string): boolean; // метод удаления предмета из каталога по его ключу
  clear(): void; // метод очистки каталога
  hasItem(id: string): boolean; // метод проверки наличия предмета в списке по его ключу
}

/** КОРЗИНА ТОВАРОВ */
export interface IBasket extends ICatalog {
  total: Price; // стоимость корзины
  order: Omit<IOrderData, keyof IBuyer>; // часть данных заказа, отправляемых в запросе
  addItemById(id: string): void; // метод добавления товара в корзину
  delItemById(id: string): void // метод удаления товара из корзины
  getItemsIds(): string[]; // массива идентификаторов товаров в корзине
}

/** ПОКУПАТЕЛЬ */
export interface IBuyer {
  payment: TPayment; // способ оплаты
  email: string; // email
  phone: string; // номер телефона
  address: string; // адрес
  readonly data?: Omit<IBuyer, 'data'>; // все данные IBuyer
}

//! КОММУНИКАЦИОННЫЙ СЛОЙ ======================================

/** ТИПЫ МЕДОТОВ API-ЗАПРОСОВ */
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

/** API */
export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

/** ОТВЕТ ПРИ УСПЕШНОМ ЗАПРОСЕ СПИСКА ТОВАРОВ */
export interface ILarekProducts<T = IProduct> {
  total: number;
  items: T[];
}

/** ДАННЫЕ, ПЕРЕДАВАЕМЫЕ В ЗАПРОСЕ ПРИ ОФОРМЛЕНИИ ЗАКАЗА */
export interface IOrderData extends IBuyer {
  total: Price; // стоимость товаров в корзине
  items: string[]; // массив идентификаторов товаров в корзине
}

/** ОТВЕТ СЕРВЕРА ПРИ УСПЕШНОМ ОФОРМЛЕНИИ ЗАКАЗА (ПОКУПКЕ) */
export interface IPurchaseData {
  id: string[]; // идентификатор заказа
  total: Price; // стоимость покупки
};