import './scss/styles.scss';

import { IList, ICatalog, IProduct, ProductId, ID_NAME, IBasket, ProductPrice, IBuyer, TPayment } from './types';

//! List ============================================================
class List<T, Key extends keyof T = keyof T> implements IList<T, Key> {
  private _items: Map<T[Key], T>;
  private _key: Key;

  /** Создание экзепляра списка в виде коллекции объектов типа T с ключом key.  
   * Опционально задается стартовый массив объектов items типа T. */
  constructor(key: Key, items?: readonly T[]) {
    this._key = key;
    this._items = new Map<T[Key], T>();
    if (items?.length) {
      this.addItems(items);
    }
  }

  /** Добавление объекта в коллекцию */
  public addItem(item: T): void {
    this._items.set(item[this._key], item);
  }

  /** Добавление массива элементов в коллекцию */
  public addItems(items: readonly T[]): void {
    for (const item of items) {
      this.addItem(item);
    }
  }

  /** Получение объекта коллекции по его ключу */
  public getItemByKey(key: T[Key]): T | undefined {
    return this._items.get(key);
  }

  /** Очистка коллекции */
  public clear(): void {
    this._items.clear();
  }

  /** Получение количества объекта в коллекции */
  get size(): number {
    return this._items.size;
  }

  /** Удаление объекта из коллекции по его ключу */
  public removeByKey(key: T[Key]): boolean {
    return this._items.delete(key);
  }

  /** Получение всех объектов коллекции */
  get items(): T[] {
    return Array.from(this._items.values());
  }

  /** Проверка наличия объекта в коллекции по его ключу */
  public hasKey(key: T[Key]): boolean {
    return this._items.has(key);
  }
}

//! ProductsList ====================================================

/** АБСТРАКТНЫЙ СПИСОК ТОВАРОВ  
 * Разработан на основе IProduct для устранения дублирования общих свойств  
 * и методов производных классов списков товаров (Catalog и Basket).
*/
abstract class ProductsList extends List<IProduct> {
  /** Конструктор абстрактного списка товаров, принимающий ключ товара (по умолчанию - 'id') */
  constructor(key: keyof IProduct = ID_NAME) {
    super(key);
  }

  /** Получение списка товаров */
  get products(): IProduct[] {
    return this.items;
  }

  /** Сохранение массива товаров в списке товаров */
  set products(products: IProduct[]) {
    this.addItems(products);
  }
}

//! Catalog =========================================================
/** КАТАЛОГ ПРОДУКТОВ */
class Catalog extends ProductsList implements ICatalog {

  /** Товар, выбранный для подробного отображения */
  #preview: IProduct | undefined = undefined;

  /** Выбор товара для подробного отображения */
  set preview(productId: ProductId) {
    this.#preview = this.getItemByKey(productId);
  }

  /** Получение товара, выбранного для подробного отображения */
  get preview(): IProduct | undefined {
    return this.#preview;
  }

  /** Получение товара по идентификатору */
  public getProductById(productId: ProductId): IProduct | undefined {
    return this.getItemByKey(productId);
  }
}

//! Basket ==========================================================
/** КОРЗИНА ПРОДУКТОВ */
class Basket extends ProductsList implements IBasket {

  /** Конструктор экземпляра корзины товаров, принимающий в качестве аргумента экземпляр
   * каталога товаров, соответствующий ICatalog
   */
  constructor(private _catalog: ICatalog) {
    super();
  }

  /** Расчет и получение стоимости корзины */
  get price(): ProductPrice {
    return this.products.reduce(
      (cost, product) => product.price ? cost + product.price : cost,
      0)
  }

  /** Количество товаров в корзине */
  get countProducts(): number {
    return this.size;
  }

  /** Добавление товара из каталога в в корзину по его идентификатору productId.  
   * Предварительно проверяется наличие товара по идентификатору в каталоге. */
  public addProduct(productId: ProductId): void {
    // Проверка наличия товара с идентификатором productId с в каталоге 
    if (this._catalog.getProductById(productId)) {
      // Добавление найденного товара из каталога в в корзину
      this.addItem(this._catalog.getProductById(productId)!);
    }
  }

  /** Удаление из корзины товара с указанным идентификатором productId.
   * Предварительно проверяется его наличие в корзине. */
  public delProduct(productId: ProductId): void {
    if (this.hasKey(productId)) this.removeByKey(productId);
  }

  /** Очистка корзины */
  public clear(): void {
    super.clear();
  }

  /** Проверка наличия товара в корзине по его идентикатору */
  public hasProduct(productId: ProductId): boolean {
    return this.hasKey(productId);
  }
}

//! Buyer ===========================================================

/** ПОКУПАТЕЛЬ */
class Buyer implements IBuyer {

  #payment: TPayment = undefined;
  #email: string = '';
  #phone: string = '';
  #address: string = '';

  /** Конструктор покупателя.  
   * Опционально определяет все свойства покупетля через buyer
   */
  constructor(buyer?: IBuyer) {
    this.buyer = buyer;
  }

  /** Определение способа оплаты */
  set payment(payment: TPayment) {
    this.#payment = payment;
  }

  /** Получение способа оплаты покупателя */
  get payment() {
    return this.#payment;
  }

  /** Определение email */
  set email(email: string) {
    this.#email = email;
  }

  /** Получение email покупателя */
  get email() {
    return this.#email;
  }

  /** Определение номера телефона */
  set phone(phone: string) {
    this.#phone = phone;
  }

  /** Получение номера телефона покупателя */
  get phone() {
    return this.#phone;
  }

  /** Определение адреса покупателя */
  set address(address: string) {
    this.#address = address;
  }

  /** Получение адреса покупателя */
  get address() {
    return this.#address;
  }

  /** Определение всех данных покупателя */
  set buyer(buyer: IBuyer | undefined) {
    buyer && ({
      payment: this.#payment,
      email: this.#email,
      phone: this.#phone,
      address: this.#address
    } = buyer);
  }

  /** Получение всех данных покупателя */
  get buyer(): IBuyer {
    return {
      payment: this.#payment,
      email: this.#email,
      phone: this.#phone,
      address: this.#address
    }
  }

  /** Очистка всех данных покупателя */
  public clear() {
    this.#payment = undefined;
    this.#email = '';
    this.#phone = '';
    this.#address = '';
  }

  /** Валидация email */
  public isEmailValid(): boolean {
    return this.#email.trim().length > 0;
  }

  /** Валидация номера телефона */
  public isPhoneValid(): boolean {
    return this.#phone.trim().length > 0;
  }

  /** Валидация адреса покупателя */
  public isAddressValid(): boolean {
    return this.#address.trim().length > 0;
  }

  /** Валидация способа оплаты */
  public isPaymentValid(): boolean {
    return !!(this.#payment);
  }

  /** Валидация всех полей */
  public isAllValid(): boolean {
    return (
      this.isPaymentValid() &&
      this.isEmailValid() &&
      this.isPhoneValid() &&
      this.isAddressValid()
    )
  }

}

//! TESTs ===========================================================

//* АбСТРАКТНЫЙ ЛИСТ
// interface someData {
//   a: number;
//   b: string;
//   c: boolean;
// }

// const someList = new List<someData>('c');
// someList.addItems([
//   { a: 5, b: 'a', c: true },
//   { a: 7, b: 'c', c: false },
//   { a: 9, b: 'c', c: true },
//   { a: 5, b: 'd', c: true },
// ]);

// console.log('===> abc', someList);

//* ТЕСТ ИЗМЕНЕНИЯ КЛЮЧЕЙ
// const pl1 = new List<IProduct>('description');
// const pl2 = new List<IProduct>('id');
// console.log('pl1:', pl1);
// console.log('pl2:', pl2);

//* ДАННЫЕ
let data = [
  { id: 'a', description: 'zxc', image: `s`, title: `string`, category: `string`, price: 200 },
  { id: 'roby', description: 'zxc', image: `st`, title: `string`, category: `string`, price: 700 },
  { id: 'c', description: 'zxc', image: `str`, title: `string`, category: `string`, price: 150 },
  { id: 'd', description: 'zxc', image: `stri`, title: `string`, category: `string`, price: 777 },
  { id: 'a', description: 'ooo', image: `strin`, title: `string`, category: `string`, price: 300 },
  { id: 'b', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 500 },
  { id: 'x', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 },
  { id: 'y', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 },
  { id: 'z', description: 'zxc', image: `string`, title: `string`, category: `string`, price: 777 },
]

//* КАТАЛОГ
const c1 = new Catalog();
c1.products = data; // или c.addItems(data);
console.log('01 ===> c1:', c1);

//* КОРЗИНА, ПРИВЯЗАННАЯ К КАТАПОГУ
let b1 = new Basket(c1);
// b1.products = data;
// Добавление товара из каталога в корзину по идентификатору
b1.addProduct("roby");
b1.addProduct("a");
b1.addProduct("b");
console.log('02 ===> b1:', b1);
// Удаление по идентификатору
// console.log('03 ===> b1.delProduct("roby"):');
// b1.delProduct("roby");
// console.log('04 ===> b1:', b1);
// Очистка корзины
// console.log('05 ===> b1.clear():');
// b1.clear();
// console.log('06 ===> b1:', b1);
// Получение стоимости корзины
console.log('07 ===> b1.price:', b1.price);
console.log('08 ===> b1.countProducts:', b1.countProducts);
console.log('09 ===> b1.hasProduct("roby"/"robbbbby"):', b1.hasProduct("roby"), b1.hasProduct("robbbbby"));

//* ПОКУПАТЕЛЬ
const buyer1 = new Buyer();
const buyer2 = new Buyer({
  payment: 'cash',
  email: 'xyz@mail.ru',
  phone: '777-777-777',
  address: 'Мавзолей'
});
console.log('buyer:', buyer1);
console.log('buyer:', buyer2);
// Проверка валидации
console.log('buyer1.isEmailValid()', buyer1.isEmailValid());
console.log('buyer2.isEmailValid()', buyer2.isEmailValid());
console.log('buyer1.isPaymentValid()', buyer1.isPaymentValid());
console.log('buyer2.isPaymentValid()', buyer2.isPaymentValid());
console.log('buyer1.isAllValid()', buyer1.isAllValid());
console.log('buyer2.isAllValid()', buyer2.isAllValid());
