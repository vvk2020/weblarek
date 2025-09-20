import './scss/styles.scss';

import { LarekAPI } from './components/models/LarekAPI';
import { API_URL, EVENTS_NAMES, PAYMENT_NAMES, SELECTORS } from './utils/constants';
import { Api } from './components/base/Api';
import { ILarekProducts, IOrderFields, IProduct } from './types';
import { EventEmitter } from './components/base/Events';
import { Catalog } from './components/models/Catalog';
import { cloneTemplate, getIdFromCard } from './utils/utils';
import { GalleryCard } from './components/view/GalleryCard';
import { GalleryView } from './components/view/GalleryView';
import { PreviewCard } from './components/view/PreviewCard';
import { Modal } from './components/common/Modal';
import { Basket } from './components/models/Basket';
import { Header } from './components/view/Header';
import { BasketCard } from './components/view/BasketCard';
import { BasketView } from './components/view/BasketView';
import { OrderForm } from './components/view/OrderForm';
import { Buyer } from './components/models/Buyer';
import { ContactsForm } from './components/view/ContactsForm';

//* ЭЛЕМЕНТЫ РАЗМЕТКИ

// Шаблоны карточек
const galleryCardTemplate = document.querySelector(SELECTORS.templates.galleryCard) as HTMLTemplateElement; // галереи
const previewCardTemplate = document.querySelector(SELECTORS.templates.previewCard) as HTMLTemplateElement; // подробного просмотра
const basketCardTemplate = document.querySelector(SELECTORS.templates.basketCard) as HTMLTemplateElement; // карточки корзины
const orderFormTemplate = document.querySelector(SELECTORS.forms.templates.order) as HTMLTemplateElement; // форма order
const contactsFormTemplate = document.querySelector(SELECTORS.forms.templates.contacts) as HTMLTemplateElement; // форма contacts

// Контейнеры ...
const galleryElement = document.querySelector(SELECTORS.gallery.container) as HTMLElement; // галереи
const basketElement = document.querySelector(SELECTORS.basket.container) as HTMLTemplateElement; // корзины
const modalContainer = document.querySelector(SELECTORS.modal.container) as HTMLElement; // модального окна
const headerContainer = document.querySelector(SELECTORS.header.container) as HTMLElement; // header-контейнер

const events = new EventEmitter(); // брокер событий
const api = new Api(API_URL);
const productsAPI = new LarekAPI(api);
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

/** ЗАГРУЗКА ДАННЫХ С СЕРВЕРА */
Promise.all([
	productsAPI.getShopProducts()
		.then((data: ILarekProducts) => {
			catalog.items = data.items;
		})
		.catch((err: Response) => console.error(err))
]);

// Создание представления карточек для корзины
function createBasketCards(): HTMLElement[] {
	return basket.items.map((item, index) => {
		const basketCard = new BasketCard(cloneTemplate(basketCardTemplate), events);
		return basketCard.render(item, ++index);
	});
}

// Брокер: регистрация события изменения состава каталога товаров
events.on(EVENTS_NAMES.items.change, () => {
	// Создание и render карточек
	const catalogCards = catalog.items.map((item) => {
		const catalogCard = new GalleryCard(cloneTemplate(galleryCardTemplate), events);
		return catalogCard.render(item);
	});
	// Render карточек в галерее
	galleryContainer.render({ cards: catalogCards });
});

// Брокер: регистрация события preview карточки
events.on(EVENTS_NAMES.card.preview, (card: HTMLElement) => {
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
events.on(EVENTS_NAMES.basket.addItem, (card: HTMLElement) => {
	// Получение id товара из его карточки card
	const id = getIdFromCard(card);
	// Добавление товара в корзину (модель данных)
	if (id) {
		// Проверка наличия товара в корзине
		const hasItemInBasket = basket.hasItem(id);
		// Если товар с id уже в корзине, то удаляем из корзины, если нет - добавляем
		if (hasItemInBasket) {
			basket.delItemById(id);
		} else {
			// Запрос данных товара из каталога (модели данных)
			const item = catalog.getItemById(id);
			// Добавление товара в корзину (модель данных)
			basket.addItem(item);
		}
	}
});

// Брокер: регистрация события изменения корзины
events.on(EVENTS_NAMES.basket.change, () => {
	// Обновление счетчика товаров в корзине
	header.render({ basketCounter: basket.itemCount });
});

// Брокер: регистрация события закрытия модального окна
events.on(EVENTS_NAMES.modal.close, () => {
	modal.close();
});

// Брокер: регистрация события открытия модального окна корзины
events.on(EVENTS_NAMES.basket.openModal, () => {
	// Размещение карточек корзины в списке корзины модального окна
	modal.setСontent([basketContainer.render({ cards: createBasketCards(), total: basket.total })]);
	modal.open(); // открытие модального окна
});

// Брокер: регистрация события удаления товара из корзины
events.on(EVENTS_NAMES.basket.delItem, (card: HTMLElement) => {
	// Получение id товара из его карточки card (разметки)
	const id = getIdFromCard(card);
	// Если товар есть наличия в корзине, удаляем
	if (id && basket.hasItem(id)) {
		basket.delItemById(id); // удаление в модели данных корзины
		// Размещение карточек корзины в списке корзины модального окна
		modal.setСontent([basketContainer.render({ cards: createBasketCards(), total: basket.total })]);
	}
});

// Брокер: открытие первой формы заполнения заказа (OrderForm)
events.on(EVENTS_NAMES.forms.order.open, () => {
	modal.setСontent([orderForm.render()]); // размещение формы в модальном окне
});

// Брокер: Изменение в полях данных на форме заполнения заказа (OrderForm)
events.on(EVENTS_NAMES.forms.order.chahgeFields, (fields: IOrderFields) => {
	// Способ оплаты типа TPayment, пересылаемый в запросе при оформлении заказа
	const paymentType = (fields.paymentButton?.name && PAYMENT_NAMES[fields.paymentButton.name]) || undefined;
	// Изменение модели данных
	buyer.set('payment', paymentType);
	buyer.set('address', fields.addressInput.value);
	// Блокировка/разблокировка кнопки перехода на следующую форму
	orderForm.disableNextButton = !(!buyer.errors.payment && !buyer.errors.address);
	// Текст ошибки валидации
	const errorMessage = (buyer.errors.payment || buyer.errors.address) || '';
	// Вывод ошибок валидации в поле на OrderForm
	orderForm.errors = errorMessage;
	// // Если ошибок нет, открыаем вторую форму (ContactsForm)
	// if (!errorMessage) modal.setСontent([contactsForm.render()]); // размещение формы в модальном окне

});

// Брокер: открытие первой формы заполнения заказа (OrderForm)
events.on(EVENTS_NAMES.forms.order.next, () => {
	console.log('EVENTS_NAMES.forms.order.next');
	// modal.setСontent([contactsForm.render()]); // размещение формы в модальном окне
});