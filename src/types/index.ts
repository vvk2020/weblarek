/** ТИПЫ МЕДОТОВ API-ЗАПРОСОВ
 * 
 */
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

/** API
 * @method get - метод запроса на получение данных, принимающий адрес и возвращающий промис ответа
 * @method post - метод запроса на внесение изменений И удаление данных, принимающий адрес, объект с данными, метод завпроса и возвращающий промис ответа
 */
export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

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

/** СПИСОК ТОВАРОВ
 * 
 * (галерея, корзина)
 * @property {IProduct[]} IProduct - список (массив) товаров
 * @property {string} selectedProductId - id выбранного товара (просмотр крточки товара)
 */
export interface IProductsList {
  products: IProduct[];
  selectedProductId: Pick<IProduct, 'id'> | null; /* string | null ??? */
}

/** СПОСОб ОПЛАТЫ
 */
export type TPayment = "online" | "При получении";

/** ПОКУПАТЕЛЬ
 * @property {string} [id] - uuid заказа ("28c57cb4-3002-4445-8aa1-2a06a5055ae5"). Назначается после оформления заказа
 * @property {PaymentMethod} payment - способ оплаты ("online" | ???)
 * @property {string} email - почта заказчика ("test@test.ru")
 * @property {string} phone - телефон заказчика (+71234567890")
 * @property {string} address - адрес доставки
 */
export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

/* ПРОИЗВОДНЫЕ ТИПЫ ДАННЫХ ОТ IProduct, ИСПОЛЬЗУЕМЫЕ В... */

/** ОПИСАНИЕ ТОВАРА
 * 
 * (карточки товаров в галереи)
 */
export type GaleryCardData = Omit<IProduct, 'description'>;

// ... карточках при их просмотре в отдельном окне полностью совпадает с IProduct

/** ОПИСАНИЕ И ССЫЛКА НА ИЗОБРАЖЕНИЕ ТОВАРА
 * 
 * (карточки товаров в корзине)
 */
export type BasketCardData = Omit<IProduct, 'description' | 'image'>;

/* ПРОИЗВОДНЫЕ ТИПЫ ДАННЫХ ОТ IBuyer, ИСПОЛЬЗУЕМЫЕ В... */

/** АДРЕС ДОСТАВКИ
 * 
 * (первое окно оформления заказа)
 */
export type Address = Pick<IBuyer, 'address'>;

/** ЭЛЕКТРОННАЯ ПОЧТА
 * (второе окно оформления заказа)
 */
export type Email = Pick<IBuyer, 'email'>;

/** ТЕЛЕФОН
 * 
 * (второе окно оформления заказа)
 */
export type Phone = Pick<IBuyer, 'phone'>;