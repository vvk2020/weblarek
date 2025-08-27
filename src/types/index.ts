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
  readonly id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

/** УНИКАЛЬНЫЙ ИДЕНТИФИКАТОР ТОВАРА */
export type ProductId = IProduct['id'];

 /** СТОИМОСТЬ ТОВАРА */
export type ProductPrice = IProduct['price'];

/** CALLBACK ДЛЯ БРОКЕРА СОБЫТИЙ */
export type Callback =  Function | null;

/** СПИСОК ТОВАРОВ
 * 
 * (галерея, корзина)
 * @property {IProduct[]} _products - массив товаров
 * @property {ProductId | null} selectedProductId - id выбранного товара (для просмотра крточки товара)
 * 
 * @method setProducts - метод создания/перезаписи массива товаров _products массивом products, полученным из параметров метода
 * @param {IProduct} products - новый массив товаров
 * @param {Function | null} payload - callback для брокера событий (для отрисовки обновленного списка)
 * @returns {void}
 * 
 * @method getProducts - метод, возвращющий массив товаров списка или undefined, если он пустой
 * @returns {IProduct[] | undefined} - массив товаров списка или undefined, если он пустой
 * 
 * @method getProduct - метод, возвращющий товар с заданным id
 * @param {ProductId} productId - уникальный идентификатор товара
 * @returns {IProduct[] | undefined} - ссылка на найденный товар или udefined при его отсутствии в списке
 * 
 * @method setProducts - метод сохранения товара в _selectedProductId для отображения
 * @param {ProductId} productId - уникальный идентификатор сохраняемого товара
 * @param {Function | null} payload - callback для брокера событий (просмотра выбранного товара в отдельном окне)
 * @returns {void}
 * 
 * @method setProducts - метод очмстки выбора товара, хранящегося в _selectedProductId
 * @returns {void}
 * 
 */

/** СПИСОК ТОВАРОВ */
export interface IProductsList {
  _products: IProduct[]; // массив товаров
  getProducts(): IProduct[] | undefined; // получение массива товаров списка
}

/** КАТАЛОГ ТОВАРОВ */
export interface ICatalog extends IProductsList {
  _selectedProductId: ProductId | null; // товар, выбранный для подробного отображения
  setProducts(products: IProduct[], payload: Callback): void; // сохранение массива товаров, полученного из products
  getProduct(productId: ProductId): IProduct | undefined; // получение товара по id
  set selectedProduct(productId: ProductId); // сохранение товара для подробного отображения
  get selectedProduct(): IProduct| undefined; // получение товара для подробного отображени
}

/** КОРЗИНА ТОВАРОВ */
export interface IBasket extends IProductsList {
  _basketPrice: ProductPrice; // стоимость товаров в корзине
  addProduct(productId: ProductId, payload: Callback): void; // добавление товара, который был получен в параметре в массив корзины;
  delProduct(productId: ProductId, payload: Callback): void; // удаление товара, полученного в параметре из массива корзины;
  clearBasket(payload: Callback): void; // очистка корзины;
  calcPrice(): void;  // расчет стоимости корзины (используется после модификаций корзины)
  get basketPrice(): ProductPrice; // получение стоимости корзины
  get countProducts(): number; // получение количества товаров в корзине
  hasProduct(productId: ProductId): boolean; // проверка наличия товара в корзине по его id
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
  checkValidation(): boolean;
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
export type Address = IBuyer['address'];

/** ЭЛЕКТРОННАЯ ПОЧТА
 * (второе окно оформления заказа)
 */
export type Email = IBuyer['email'];

/** ТЕЛЕФОН
 * 
 * (второе окно оформления заказа)
 */
export type Phone = IBuyer['phone'];
