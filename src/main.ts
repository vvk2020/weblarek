import './scss/styles.scss';

import { LarekAPI } from './components/models/LarekAPI';
import { API_URL, EVENTS_NAMES, SELECTORS } from './utils/constants';
import { Api } from './components/base/Api';
import { ICard, IGalleryCard, ILarekProducts, IPreviewCardData, IProduct } from './types';
import { EventEmitter } from './components/base/Events';
import { Catalog } from './components/models/Catalog';
import { cloneTemplate, getElementData } from './utils/utils';
import { GalleryCard } from './components/view/GalleryCard';
import { Gallery } from './components/view/Gallery';
import { PreviewCard } from './components/view/PreviewCard';
import { Modal } from './components/common/Modal';
import { Basket } from './components/models/Basket';
import { Header } from './components/view/Header';

//* ЭЛЕМЕНТЫ РАЗМЕТКИ

// Шаблоны карточек
const galleryCardTemplate = document.querySelector(SELECTORS.templates.galleryCard) as HTMLTemplateElement; // галереи
const previewCardTemplate = document.querySelector(SELECTORS.templates.previewCard) as HTMLTemplateElement; // подробного просмотра
// const basketCardTemplate = document.querySelector(SELECTORS.template.basketCard) as HTMLTemplateElement; // шаблон карточки галереи

// Контейнеры для вывода карточек
const galleryElement = document.querySelector(SELECTORS.gallery.container) as HTMLElement; // галерея
const modalContainer = document.querySelector(SELECTORS.modal.container) as HTMLElement; // модальное окно
// const basketElement = document.querySelector(SELECTORS.gallery.container) as HTMLElement; // корзина
// const previewElement = document.querySelector(SELECTORS.gallery.container) as HTMLElement; // корзина

const headerContainer = document.querySelector(SELECTORS.header.container) as HTMLElement; // header-контейнер

const events = new EventEmitter(); // брокер событий
const api = new Api(API_URL);
const productsAPI = new LarekAPI(api);
const catalog = new Catalog(events); // cписок карточек галереи
const galleryContainer = new Gallery(galleryElement); // галерея (контейнер карточек каталога)
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
	galleryContainer.render({ gallery: catalogCards });
});

// Брокер: регистрация события выбора карточки (для ее preview)
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
		console.log('hasItemInBasket', hasItemInBasket);
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