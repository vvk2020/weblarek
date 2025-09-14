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
  template: {
    galleryCard: '#card-catalog', // в галерее
    previewCard: '#card-preview', // в подробном отображении
    basketCard: '#card-basket', // в корзине
  },

  // Галерея карточек
  gallery: {
    container: '.gallery', // контейнер
  },

  // Селекторы элементов карточек
  card: {
    // <button class="gallery__item card">
    // <span class="card__category card__category_soft">софт-скил</span>
    // <h2 class="card__title">+1 час в сутках</h2>
    // <img class="card__image" src="<%=require('../images/Subtract.svg')%>" alt="" />
    // <span class="card__price">750 синапсов</span>
    // </button>
    category: '.card__category',
    title: '.card__title',
    image: '.card__image',
    price: '.card__price',
    description: '.card__text'

  },


  // gallerySelector: '.gallery',
  // gallerySettings: {
  //   activeItemClass: 'gallery__item_active',
  //   itemClass: 'gallery__item',
  // },

};

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