export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}


// /**
//  * ТОВАР
//  * @property {string} id - uuid товара ("854cef69-976d-4c2a-a18c-2aa45046c390"),
//  * @property {string} description - описание ("Если планируете решать задачи в тренажёре, берите два."),
//  * @property {string} image - картинка ("/5_Dots.svg")
//  * @property {string} title - название ("+1 час в сутках")
//  * @property {string} category - категория ("софт-скил")
//  * @property {number | null} price - цена (750 | null)
//  */
// interface ICard {
//   id: string; // уникальный идентификатор товара ("854cef69-976d-4c2a-a18c-2aa45046c390"),
//   description: string; // Описание ("Если планируете решать задачи в тренажёре, берите два."),
//   image: string; // картинка ("/5_Dots.svg")
//   title: string; // название ("+1 час в сутках")
//   category: string; // категория ("софт-скил")
//   price: number | null; // цена (750 | null)
// }

type TPayment = "online" | "При получении";

// /**
//  * ЗАКАЗ
//  * @property {string} [id] - uuid заказа ("28c57cb4-3002-4445-8aa1-2a06a5055ae5")юНазначается после оформления заказа
//  * @property {PaymentMethod} payment - способ оплаты ("online" | ???)
//  * @property {string} email - почта заказчика ("test@test.ru")
//  * @property {string} phone - телефон заказчика (+71234567890")
//  * @property {number | null} total - сумма заказа (2200)
//  * @property {ICard[]} items - массив товаров (для API - массив UUID товаров (["854cef69-976d-4c2a-a18c-2aa45046c390","c101ab44-ed99-4a54-990d-47aa2bb4e7d9"])
//  * 
//  */
// interface IOrder {
//   id?: string, //28c57cb4-3002-4445-8aa1-2a06a5055ae5 - уникальный идентификатор заказа
//   payment: PaymentMethod, // способ оплаты ("online")
//   email: string, // почта заказчика ("test@test.ru")
//   phone: string, // телефон заказчика (+71234567890")
//   total: number | null, // сумма заказа (2200)
//   items: ICard[] // массив товаров (для API - массив UUID товаров (["854cef69-976d-4c2a-a18c-2aa45046c390","c101ab44-ed99-4a54-990d-47aa2bb4e7d9"])
// }

 /** ТОВАР
 * @property {string} id - uuid товара ("854cef69-976d-4c2a-a18c-2aa45046c390"),
 * @property {string} description - описание ("Если планируете решать задачи в тренажёре, берите два."),
 * @property {string} image - картинка ("/5_Dots.svg")
 * @property {string} title - название ("+1 час в сутках")
 * @property {string} category - категория ("софт-скил")
 * @property {number | null} price - цена (750 | null)
 */
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

/**
 * ПОКУПАТЕЛЬ
 * @property {string} [id] - uuid заказа ("28c57cb4-3002-4445-8aa1-2a06a5055ae5")юНазначается после оформления заказа
 * @property {PaymentMethod} payment - способ оплаты ("online" | ???)
 * @property {string} email - почта заказчика ("test@test.ru")
 * @property {string} phone - телефон заказчика (+71234567890")
 * @property {number | null} total - сумма заказа (2200)
 * @property {ICard[]} items - массив товаров (для API - массив UUID товаров (["854cef69-976d-4c2a-a18c-2aa45046c390","c101ab44-ed99-4a54-990d-47aa2bb4e7d9"])
 * 
 */
export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}