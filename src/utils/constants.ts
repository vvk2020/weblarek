import { TPayment } from "../types";

/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`;
/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/** СЕЛЕКТОРЫ ЭЛЕМЕНТОВ РАЗМЕТКИ */
export const SELECTORS = {

  header: { // Header
    container: '.header__container', // контейнер
    basketCounter: '.header__basket-counter', // счетчик товаров в корзине
  },

  templates: { // шаблоны карточек товаров в ...
    galleryCard: '#card-catalog', // галерее
    previewCard: '#card-preview', // подробном отображении
    basketCard: '#card-basket', // корзине
  },

  gallery: { // галерея карточек
    container: '.gallery', // контейнер
    card: 'gallery__item', // карточка
  },

  basket: { // корзина карточек
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

  preview: { // окно подробного просмотра карточки
    buttonBasket: '.card__button', // кнопка добавления/удаления товара из корзины
  },

  card: { // селекторы элементов карточки
    selector: '.card',
    category: '.card__category',
    title: '.card__title',
    image: '.card__image',
    price: '.card__price',
    description: '.card__text',
  },

  modal: { // модальное окно
    container: '#modal-container', // контейнер
    closeButton: '.modal__close', // кнопка закрытия окна
    contentContainer: '.modal__content', // контейнер контента окна
  },

  forms: { // формы
    templates: { // шаблоны
      order: '#order', // формы ввода email и телефона
      contacts: '#contacts', // формы ввода способа оплаты и адреса
      success: '#success', // сообщения об успешном оформлении заказа
    },
    errors: '.form__errors', // поле вывода сообщения об ошибках формы (валидации)
    submitButton: 'button[type="submit"]', // ыгиьше-кнопка
    inputs: { // поля ввода данных
      selector: '.form__input' // поле ввода форм
      // address: 'input[name="address"]', // адрес доставки
    },
    order: { // форма OrderForm
      orderButton: '.order__button',
      fields: { // поля
        address: 'input[name="address"]', // поле адреса доставки
        payment: { // группа кнопок выбора способа оплаты
          container: '.order__buttons', // контейнер кнопок способов оплаты
          button: 'button.button_alt',// кнопка способа оплаты
        }
      }
    },
    contacts: { // форма ContactsForm
      fields: { // поля
        email: 'input[name="email"]', // email
        phone: 'input[name="phone"]', // телефон
      }
    }
  },

  success: { // сообщение об успешном оформлении заказа
    total: '.order-success__description', // списано синапсов
    buttonClose: '.order-success__close', // кнопка закрытия окна
  }
};

/** СОБЫТИЯ БРОКЕРА */
export const EVENTS = {
  card: { // карточка товара
    preview: 'card:select', // карточка выбрана
  },
  catalog: { // товары (модель данных)
    change: 'items:change', // список товаров изменен
  },
  basket: { // корзина
    handleItem: `basket:handleAdd`, // добавление/удаление товара корзины
    delItem: `basket:delAdd`, // удаление товара из корзины
    change: `basket:change`, // корзина изменена
    openModal: 'basket:openModal', // открытие (просмотр) корзины в модальном окне
  },
  modal: { // модальное окно
    close: 'modal:close' // закрыть
  },
  forms: { // формы
    order: { // первая (OrderForm)
      open: 'order:openForm', // открытие формы
      chahgeFields: 'order:chahgeFields', // изменение в полях ввода данных
      submit: 'order:next', // submit формы
    },
    contacts: { // вторая (ContactsForm)
      chahgeFields: 'contacts:chahgeFields', // изменение в полях ввода данных
      submit: 'contacts:next', // submit формы
    }
  },
  success: { // успешное формление заказа
    close: 'success:close', // закрыть окно
  }
}

/** КОНСТАНТА СООТВЕТСТВИЙ КАТЕГОРИЙ ТОВАРА МОДИФИКАТОРАМ, ИСПОЛЬЗУЕМЫМ ДЛЯ ОТОБРАЖЕНИЯ ФОНА КАТЕГОРИИ */
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

export const PAYMENT_NAMES: { [key: string]: TPayment } = {
  'card': 'online',
  'cash': 'cash',
  'undefinedKey': undefined,
};

/** Endpoint get-запроса списка товаров */
export const URI_PRODUCTS = '/product/';

/** Endpoint post-запроса оформления заказа */
export const URI_ORDER = '/order/';