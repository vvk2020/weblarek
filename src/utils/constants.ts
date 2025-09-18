/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`;
/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/** Константа селекторов элементов разметки */
export const SELECTORS = {
  // Header
  header: {
    container: '.header__container', // контейнер
    basketCounter: '.header__basket-counter', // счетчик товаров в корзине
  },

  // id шаблонов карточек товаров
  templates: {
    // Карточка
    galleryCard: '#card-catalog', // в галерее
    previewCard: '#card-preview', // в подробном отображении
    basketCard: '#card-basket', // в корзине
  },

  // Галерея карточек
  gallery: {
    container: '.gallery', // контейнер
    card: 'gallery__item', // карточка
  },

  basket: {
    container: '#basket', // контейнер корзины
    listContainer: '.basket__list', // контейнер списка карточек
    total: '.basket__price', // стоимость товаров в корзине
    orderButton: '.basket__button', // кнопка оформления заказа
    delItemButton: '.basket__item-delete.card__button', // кнопка удаления товара из корзины
    card: {
      index: '.basket__item-index', // порядковый номер в корзине
      delButton: '.basket__item-delete', // кнопка удаления товара из корзины
    }
  },

  preview: {
    // container: '.gallery', // контейнер
    buttonBasket: '.card__button', // кнопка добавления/удаления товара из корзины
  },

  // Селекторы элементов карточек
  card: {
    // <button class="gallery__item card">
    // <span class="card__category card__category_soft">софт-скил</span>
    // <h2 class="card__title">+1 час в сутках</h2>
    // <img class="card__image" src="<%=require('../images/Subtract.svg')%>" alt="" />
    // <span class="card__price">750 синапсов</span>
    // </button>    
    selector: '.card',
    category: '.card__category',
    title: '.card__title',
    image: '.card__image',
    price: '.card__price',
    description: '.card__text',
  },

  // Модальное окно
  modal: {
    container: '#modal-container', // контейнер
    closeButton: '.modal__close',
    contentContainer: '.modal__content', // контейнер контента окна
  },

  // Формы
  forms: {
    templates: { // шаблоны
      order: '#order', // форма ввода email и телефона
      contacts: '#contacts', // форма ввода способа оплаты и адреса
    },
    errors: '.form__errors', // поле вывода сообщения об ошибках формы (валидации)
    inputs: { // поля ввода данных
      selector: '.form__input' // поле ввода форм
      // address: 'input[name="address"]', // адрес доставки
    }
  },
};

// Имена событий брокера событий
export const EVENTS_NAMES = {
  // карточка товара
  card: {
    preview: 'card:select', // карточка выбрана
  },
  // товары (модель данных)
  items: {
    change: 'items:change', // список товаров изменен
  },
  // корзина
  basket: {
    addItem: `basket:itemAdd`, // добавление товара в корзину
    delItem: `basket:delAdd`, // удаление товара из корзины
    change: `basket:change`, // корзина изменена
    openModal: 'basket:openModal', // открытие (просмотр) корзины в модальном окне
  },
  // модальное окно
  modal: {
    close: 'modal:close' // закрыть
  },
  // заказ (покупка)
  order: {
    openOrderForm: 'order: openOrderForm', // открытие первой формы оформления заказа (формы order) 
  }
}

/** Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = new Proxy({
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
}, {
  get(target, prop: string) {
    return target[prop as keyof typeof target] || target['другое'];
  }
});

/** Endpoint get-запроса списка товаров */
export const URI_PRODUCTS = '/product/';

/** Endpoint post-запроса оформления заказа */
export const URI_ORDER = '/order/';