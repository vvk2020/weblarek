import './scss/styles.scss';

import { LarekAPI } from './components/models/LarekAPI';
import { API_URL, EVENTS, PAYMENT_NAMES, SELECTORS } from './utils/constants';
import { Api } from './components/base/Api';
import { IContactsFields, ILarekProducts, IOrderData, IOrderFields, IProduct, IPurchaseData } from './types';
import { EventEmitter } from './components/base/Events';
import { Catalog } from './components/models/Catalog';
import { cloneTemplate, getIdFromCard } from './utils/utils';
import { GalleryView } from './components/view/GalleryView';
import { PreviewCard } from './components/view/cards/PreviewCard';
import { Modal } from './components/view/Modal';
import { Basket } from './components/models/Basket';
import { Header } from './components/view/Header';
import { BasketView } from './components/view/BasketView';
import { OrderForm } from './components/view/forms/OrderForm';
import { Buyer } from './components/models/Buyer';
import { ContactsForm } from './components/view/forms/ContactsForm';
import { GalleryCard } from './components/view/cards/GalleryCard';
import { BasketCard } from './components/view/cards/BasketCard';
import { Success } from './components/view/Success';

//* ЭЛЕМЕНТЫ РАЗМЕТКИ

// Шаблоны карточек, форм и др.
const galleryCardTemplate = document.querySelector(SELECTORS.templates.galleryCard) as HTMLTemplateElement; // галереи
const previewCardTemplate = document.querySelector(SELECTORS.templates.previewCard) as HTMLTemplateElement; // подробного просмотра
const basketCardTemplate = document.querySelector(SELECTORS.templates.basketCard) as HTMLTemplateElement; // карточки корзины
const orderFormTemplate = document.querySelector(SELECTORS.forms.templates.order) as HTMLTemplateElement; // форма order
const contactsFormTemplate = document.querySelector(SELECTORS.forms.templates.contacts) as HTMLTemplateElement; // форма contacts
const successTemplate = document.querySelector(SELECTORS.forms.templates.success) as HTMLTemplateElement; // форма contacts

// Контейнеры
const galleryElement = document.querySelector(SELECTORS.gallery.container) as HTMLElement; // галереи
const basketElement = document.querySelector(SELECTORS.basket.container) as HTMLTemplateElement; // корзины
const modalContainer = document.querySelector(SELECTORS.modal.container) as HTMLElement; // модального окна
const headerContainer = document.querySelector(SELECTORS.header.container) as HTMLElement; // header-контейнер

const events = new EventEmitter(); // брокер событий
const api = new Api(API_URL);
const catalog = new Catalog(events); // cписок карточек галереи
const galleryContainer = new GalleryView(galleryElement); // галерея (контейнер карточек каталога)
const basketContainer = new BasketView(cloneTemplate(basketElement), events); // корзина (контейнер карточек корзины)
const previewCard = new PreviewCard(cloneTemplate(previewCardTemplate), events); // контент preview карточки
const modal = new Modal(modalContainer, events, []); // модальное окно
const basket = new Basket(events);
const header = new Header(headerContainer, events);
const orderForm = new OrderForm(cloneTemplate(orderFormTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsFormTemplate), events);
const buyer = new Buyer(); // покупатель
const productsAPI = new LarekAPI(api);
const success = new Success(cloneTemplate(successTemplate), events);

//* ЗАГРУЗКА ДАННЫХ С СЕРВЕРА
productsAPI.getShopProducts()
	.then((data: ILarekProducts) => {
		catalog.items = data.items;
	})
	.catch((err: Response) => console.error(err));

// Создание представления карточек для корзины
function createBasketCards(): HTMLElement[] {
	return basket.items.map((item, index) => {
		const basketCard = new BasketCard(cloneTemplate(basketCardTemplate), events);
		return basketCard.render(item, ++index);
	});
}

// Брокер: регистрация события изменения состава каталога товаров
events.on(EVENTS.catalog.change, () => {
	// Создание и render карточек
	const galleryCards = catalog.items.map((item) => {
		const catalogCard = new GalleryCard(cloneTemplate(galleryCardTemplate), events);
		return catalogCard.render(item);
	});
	// Render карточек в галерее
	galleryContainer.render({ cards: galleryCards });
});

// Брокер: регистрация события preview карточки
events.on(EVENTS.card.preview, (card: HTMLElement) => {
	// Получение id товара из его карточки card (разметки)
	const id = getIdFromCard(card);
	if (id) {
		// Запрос данных товара из каталога (модели данных)
		const item = catalog.getItemById(id);
		// Проверка наличия товара в корзине
		const hasItemInBasket = basket.hasItem(id);
		// Передача данных в preview карточки и размещение его в модальном окне
		modal.setСontent([previewCard.render(item, hasItemInBasket)]);
		modal.open(); // открытие модального окна
	}
});

// Брокер: регистрация события добавления товара из галереи в корзину (модель данных)
events.on(EVENTS.basket.addItem, (card: HTMLElement) => {
	// Получение id товара из его карточки card
	const id = getIdFromCard(card);
	// Добавление товара в корзину (модель данных)
	if (id && !basket.hasItem(id)) {
		const item = catalog.getItemById(id); // запрос данных товара из каталога (модели данных)
		basket.addItem(item); // добавление товара в корзину (модель данных)
	}
});

// Брокер: регистрация события изменения корзины
events.on(EVENTS.basket.change, () => {
	// Обновление счетчика товаров в корзине
	header.render({ basketCounter: basket.itemCount });
});

// Брокер: регистрация события закрытия модального окна
events.on(EVENTS.modal.close, () => {
	modal.close();
});

// Брокер: регистрация события открытия модального окна корзины
events.on(EVENTS.basket.openModal, () => {
	// Размещение карточек корзины в списке корзины модального окна
	modal.setСontent([basketContainer.render({ cards: createBasketCards(), total: basket.total })]);
	modal.open(); // открытие модального окна
});

// Брокер: регистрация события удаления товара из корзины
events.on(EVENTS.basket.delItem, (card: HTMLElement) => {
	// Получение id товара из его карточки card (разметки)
	const id = getIdFromCard(card);
	// Если товар в корзине, удаляем
	if (id && basket.hasItem(id)) {
		basket.delItemById(id); // удаление в модели данных корзины
		// Размещение карточек корзины в списке корзины модального окна
		modal.setСontent([basketContainer.render({ cards: createBasketCards(), total: basket.total })]);
	}
});

// Брокер: открытие формы OrderForm
events.on(EVENTS.forms.order.open, () => {
	modal.setСontent([orderForm.render()]); // размещение формы в модальном окне
});

// Брокер: Изменение в полях данных на форме заполнения заказа (OrderForm)
events.on(EVENTS.forms.order.chahgeFields, (fields: IOrderFields) => {
	// Способ оплаты типа TPayment, пересылаемый в запросе при оформлении заказа
	const paymentType = (fields.payment?.name && PAYMENT_NAMES[fields.payment.name]) || undefined;
	// Изменение модели данных
	buyer.set('payment', paymentType);
	buyer.set('address', fields.address.value);
	// Блокировка/разблокировка кнопки перехода на следующую форму
	orderForm.disableSubmitButton = !(!buyer.errors.payment && !buyer.errors.address);
	// Текст ошибки валидации
	const errorMessage = (buyer.errors.payment || buyer.errors.address) || '';
	// Вывод ошибок валидации в поле на OrderForm
	orderForm.errors = errorMessage;
});

// Брокер: submit формы OrderForm
events.on(EVENTS.forms.order.submit, () => {
	modal.setСontent([contactsForm.render()]); // размещение формы в модальном окне
});

// Брокер: Изменение в полях данных на форме оплаты зака (ContactsForm)
events.on(EVENTS.forms.contacts.chahgeFields, (fields: IContactsFields) => {
	// Изменение модели данных
	buyer.set('email', fields.emailInput.value);
	buyer.set('phone', fields.phoneInput.value);
	// Блокировка/разблокировка кнопки перехода на следующую форму
	contactsForm.disableSubmitButton = !(!buyer.errors.email && !buyer.errors.phone);
	// Текст ошибки валидации
	const errorMessage = (buyer.errors.email || buyer.errors.phone) || '';
	// Вывод ошибок валидации в поле формы
	contactsForm.errors = errorMessage;
});

// Брокер: submit формы ContactsForm
events.on(EVENTS.forms.contacts.submit, () => {
	// Запрос оформления заказа
	if (buyer.valid) {
		// Данные для запроса
		const orderData: IOrderData = {
			...buyer.data,
			total: basket.total,
			items: Object.values(basket.items).map(item => item.id),
		};
		productsAPI.placeOrder(orderData)
			.then((data: IPurchaseData) => {
				basket.clear(); // очистка корзины
				// Сброс полей форм
				orderForm.reset();
				contactsForm.reset();
				// Размещение формы с сообщением об успешной оплате в модальном окне
				modal.setСontent([success.render({ total: data.total })]);
			})
			.catch((err: Response) => console.error(err));
	}

});

// Брокер: закрытие окна с сообщением об успешной оплате
events.on(EVENTS.success.close, () => {
	modal.close(); // закрытие модального окна
});