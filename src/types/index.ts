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

/** КАТАЛОГ ТОВАРОВ */
export interface ICatalog {
  items: IProduct[]; // массив товаров в каталоге
  selectedItem: IProduct | undefined; // товар, выбранный из каталога
  addItems(items: IProduct[]): void; // метод добавления массива товаров в каталог
  getItemById(id: string): IProduct | undefined; // метод вывода товара из каталога по его id
}

/** КОРЗИНА ТОВАРОВ */
export interface IBasket {
  items: IProduct[]; // массив товаров в корзине
  itemCount: number; // количество товаров в корзине
  total: Price; // стоимость товаров в корзине
  addItem(item: IProduct): void; // метод добавления товара в корзину
  delItemById(id: string): void // метод удаления товара из корзины
}

/** ПОКУПАТЕЛЬ */
export interface IBuyer {
  payment: TPayment; // способ оплаты
  email: string; // email
  phone: string; // номер телефона
  address: string; // адрес
}

//! КОММУНИКАЦИОННЫЙ СЛОЙ ======================================

/** ТИПЫ МЕДОТОВ API-ЗАПРОСОВ */
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

/** API */
export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

/** ОТВЕТ ПРИ УСПЕШНОМ ЗАПРОСЕ КАТАЛОГА ТОВАРОВ */
export interface ILarekProducts {
  total: number;
  items: IProduct[];
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
}

//! СЛОЙ ПРЕДСТАВЛЕНИЯ =========================================

/** Header страницы */
export interface IHeaderData {
  basketCounter: number; // счетчик товаров в корзине
}

/** Абстрактная карточка товара */
export type IGalleryCardData = Pick<IProduct, 'id' | 'category' | 'title' | 'image' | 'price'>

/** Галлерея карточек товара */
export interface IGalleryData {

}