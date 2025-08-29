// FIXME: Исправить интерфейсы и и их описание в соответствии с README.md

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
* @property {readonly string} id - uuid товара,
* @property {string} description - описание,
* @property {string} image - картинка
* @property {string} title - название
* @property {string} category - категория
* @property {number | null} price - цена
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
export type Callback = Function | null;

/** АБСТРАКТНЫЙ СПИСОК
 * 
 * Интерфейс-прототип для списков товаров галереи и корзины.  
 * Элементаы списков галереи и корзины - товары, ключи - уникальные идентификаторы.
 * 
 * @property {T[]} items - набор элементов
 * @property {number} size - количество элементов в списке
 * 
 * @method addItem - метод добавления элемента в список
 * @param {T} item - элемент
 * @returns {void}
 * 
 * @method addItems void; - метод добавления массива элементов в список
 * @param {readonly T[]} items - массива элементов
 * @returns {void}
 * 
 * @method getItemByKey - метод вывода элемента из списка по его ключу
 * @param {T[Key]} key - ключ исакомого элемента
 * @returns {T | undefined} - искомый элемент
 * 
 * @method removeByKey - метод удаления элемента из списка по его ключу
 * @param {T[Key]} key - ключ выводимого элемента
 * @returns {boolean} - результат удаления: true - успешно, false - нет
 * 
 * @method clear() - метод очистки списка элементов
 * @returns {void}
 * 
 * @method hasKey - метод проверки наличия элемента в списке по его ключу
 * @param {T[Key]} key - ключ выводимого элемента
 * @returns {boolean} - результат проерки: true - имеется, false - нет
 */
interface IList<T, Key extends keyof T> {
  items: T[]; // массив элементов (товаров)
  size: number; // количество элементов (товаров) в списке
  addItem(item: T): void; // метод добавления элемента (товара) в список
  addItems(items: readonly T[]): void; // метод добавления массива элементов (товаров) в список
  getItemByKey(key: T[Key]): T | undefined; // метод вывода элемента (товара) из списка по его ключу (идентификатору)
  removeByKey(key: T[Key]): boolean; // метод удаления элемента (товара) из списка по его ключу (идентификатору)
  clear(): void; // метод очистки списка
  hasKey(key: T[Key]): boolean; // метод проверки наличия элемента (товара) в списке по его ключу (идентификатору)
}

/** КАТАЛОГ ТОВАРОВ 
 * 
 * 
*/
export interface ICatalog extends IList<IProduct, 'id'> {
  selectedProductId: ProductId | null; // идентификатор товара, выбранного для подробного отображения
  setProducts(products: IProduct[], payload: Callback): void; // метод сохранения массива товаров, полученного из products
  getProduct(productId: ProductId): IProduct | undefined; // метод получения товара по идентификатору 
  set selectedProduct(productId: ProductId); // метод сохранения товара для подробного отображения
  get selectedProduct(): IProduct | undefined; // метод получение товара для подробного отображени
}

/** КОРЗИНА ТОВАРОВ */
export interface IBasket extends IList<IProduct, 'id'> {
  addProduct(productId: ProductId, payload: Callback): void; // добавление товара, который был получен в параметре в массив корзины;
  delProduct(productId: ProductId, payload: Callback): void; // удаление товара, полученного в параметре из массива корзины;
  clearBasket(payload: Callback): void; // очистка корзины;
  calcPrice(): void;  // расчет стоимости корзины (используется после модификаций корзины)
  get Price(): ProductPrice; // получение стоимости корзины
  get countProducts(): number; // получение количества товаров в корзине
  hasProduct(productId: ProductId): boolean; // проверка наличия товара в корзине по его id
}

/** СПОСОб ОПЛАТЫ
 */
export type TPayment = "card" | "cash"; // FIXME уточнить значения TPayment

/** ПОКУПАТЕЛЬ
 * @property {string} [id] - uuid заказа ("28c57cb4-3002-4445-8aa1-2a06a5055ae5"). Назначается после оформления заказа
 * @property {TPayment} payment - способ оплаты ("online" | ???)
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
export interface IBuyerData {
  isValid(buyer: IBuyer): boolean; // проверка валидности данных
  clear(): void; // очистка данных покупателя
  // сеттеры свойств
  set payment(paymentType: TPayment);
  set email(mail: Email);
  set phone(phoneNum: Phone);
  set address(addr: Address);
  // геттеры свойств
  get payment(): TPayment;
  get email(): Email;
  get phone(): Phone;
  get address(): Address;
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
