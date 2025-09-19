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

export interface ICard<T> {
  set title(text: string);
  set price(value: Price);
  render(data?: Partial<T>): HTMLElement;
}

export interface IGalleryCard extends ICard<IGalleryCardData> {
  set category(key: string);
  set image(path: string);
}


// export interface ICardsData {
//   cards: IProduct[];
//   // preview: string | null;
//   // addCard(card: ICard): void;
//   // deleteCard(cardId: string, payload: Function | null): void;
//   // updateCard(card: ICard, payload: Function | null): void;
//   // getCard(cardId: string): ICard;
//   // checkValidation(data: Record<keyof TCardInfo, string>): boolean;
// }


/** HEADER СТРАНИЦЫ */
export interface IHeaderData {
  basketCounter: number; // счетчик товаров в корзине
}

/** ДАННЫЕ КАРТОЧКИ ТОВАРА В ГАЛЛЕРЕЕ, КОРЗИНЕ И ОКНЕ ПОДРОБНОГО ПРОСМОТРА */
export type IGalleryCardData = Pick<IProduct, 'id' | 'category' | 'title' | 'image' | 'price'>;
export type IBasketCardData = Pick<IProduct, 'id' | 'title' | 'price'>;
export type IPreviewCardData = IProduct;

/** МОДАЛЬНОЕ ОКНО */
export interface IModal {
  setСontent(elements: HTMLElement[]): void; // размещение контента в контейнере окна
  open(): void; // метод открытия окна
  close(): void; // метод закрытия окна
}


/** ГАЛЛЕРЕЯ КАРТОЧЕК ТОВАРА */
export interface IGalleryData {
  cards: HTMLElement[];
}

/** КОРЗИНА КАРТОЧЕК ТОВАРА */
export interface IBasketData {
  cards: HTMLElement[];
  total: Price;
}

/** АбСТРАКТНАЯ ФОРМА */
export interface IForm {
  errors: string; // текст ошибок валидации
}

/**  ФОРМА ЗАКАЗА */
export interface IOrderForm {
  render(): HTMLElement;
}