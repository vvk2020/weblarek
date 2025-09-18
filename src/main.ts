import './scss/styles.scss';

import { LarekAPI } from './components/models/LarekAPI';
import { API_URL, EVENTS_NAMES, SELECTORS } from './utils/constants';
import { Api } from './components/base/Api';
import { ILarekProducts } from './types';
import { EventEmitter } from './components/base/Events';
import { Catalog } from './components/models/Catalog';
import { cloneTemplate, getElementData } from './utils/utils';
import { GalleryCard } from './components/view/GalleryCard';
import { GalleryView } from './components/view/GalleryView';
import { PreviewCard } from './components/view/PreviewCard';
import { Modal } from './components/common/Modal';
import { Basket } from './components/models/Basket';
import { Header } from './components/view/Header';
import { BasketCard } from './components/view/BasketCard';
import { BasketView } from './components/view/BasketView';

//* ЭЛЕМЕНТЫ РАЗМЕТКИ

// Шаблоны карточек
const galleryCardTemplate = document.querySelector(SELECTORS.templates.galleryCard) as HTMLTemplateElement; // галереи
const previewCardTemplate = document.querySelector(SELECTORS.templates.previewCard) as HTMLTemplateElement; // подробного просмотра
const basketCardTemplate = document.querySelector(SELECTORS.templates.basketCard) as HTMLTemplateElement; // карточки корзины

// Контейнеры ...
const galleryElement = document.querySelector(SELECTORS.gallery.container) as HTMLElement; // галереи
console.log('galleryElement', galleryElement);

const basketElement = document.querySelector(SELECTORS.basket.container) as HTMLTemplateElement; // корзины
const modalContainer = document.querySelector(SELECTORS.modal.container) as HTMLElement; // модального окна
// const previewElement = document.querySelector(SELECTORS.gallery.container) as HTMLElement; // корзина

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

/** ЗАГРУЗКА ДАННЫХ С СЕРВЕРА */
Promise.all([
	productsAPI.getShopProducts()
		.then((data: ILarekProducts) => {
			catalog.items = data.items;
		})
		.catch((err: Response) => console.error(err))
]);

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
	// Запрос id выбранной карточки из разметки
	const { id } = getElementData(card, {
		id: (value: string | undefined) => value || ''
	});
	if (id && typeof (id) === 'string') {
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
	// Запрос id выбранной карточки из разметки
	const { id } = getElementData(card, {
		id: (value: string | undefined) => value || ''
	});
	// Добавление товара в корзину (модель данных)
	if (id && typeof (id) === 'string') {
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
	// Создание представления карточек для корзины
	const basketCards = basket.items.map((item, index) => {
		const basketCard = new BasketCard(cloneTemplate(basketCardTemplate), events);
		return basketCard.render(item, ++index);
	});

	// Размещение карточек корзины в списке корзины модального окна
	modal.setСontent([basketContainer.render({ cards: basketCards, total: basket.total })]);
	modal.open(); // открытие модального окна
});
