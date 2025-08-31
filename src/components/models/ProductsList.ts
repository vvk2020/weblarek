import { IProduct } from "../../types";
import { ID_NAME } from "../../utils/constants";
import { List } from "./List";

/** АБСТРАКТНЫЙ СПИСОК ТОВАРОВ  
 * Разработан на основе IProduct для устранения дублирования общих свойств  
 * и методов производных классов списков товаров (Catalog и Basket).
*/
export abstract class ProductsList extends List<IProduct> {
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